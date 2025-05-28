"use server";

import prisma from "@/lib/db";
import { Item, CartItem, Cart } from "@/generated/prisma";
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Prisma } from "@prisma/client";

type FullCartItem = Prisma.CartItemGetPayload<{
  include: { item: true };
}>;

export async function getOrCreateSessionId(): Promise<string> {
    // Check if the session ID cookie exists
    const cookieStore = await cookies()
    let sessionId = cookieStore.get('sessionId')?.value
    // If not, create a new session ID and set it in the cookies
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        (await cookies()).set('sessionId', sessionId, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        })
    }

    return sessionId
}

export async function getCartItems(): Promise<FullCartItem[]> {
    // Get the session ID from cookies
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    // If no session ID, return an empty list
    if (!sessionId) {
        return [];
    }
    // Find the cart associated with the session ID
    const cart = await prisma.cart.findFirst({
        where: { session_id: sessionId },
    });
    if (!cart) {
        return [];
    }
    // Find the cart items associated with the cart
    const cartItems = await prisma.cartItem.findMany({
        where: { cart_id: cart.id },
        include: {
            item: true,
        },
    });
    return cartItems;
}

export async function updateCartTotalPrice(cartId: string): Promise<void> {
    // Get the cart items
    const cartItems = await prisma.cartItem.findMany({
        where: { cart_id: cartId },
        include: {
        item: true,
        },
    });
    
    //Calculate the total price
    const totalPrice = cartItems.reduce((sum, cartItem) => {
        return sum + cartItem.quantity * cartItem.item.price;
    }, 0);
    
    // Update the cart total price
    await prisma.cart.update({
        where: { id: cartId },
        data: { totalPrice: totalPrice },
    });
}

export async function addItemToCart(formdata: FormData) : Promise<void> {
    // Get or create a session ID
    let sessionId = await getOrCreateSessionId()
    // Check if the cart exists for the session ID
    let cart = await prisma.cart.findFirst({ where: { session_id: sessionId} });
    // If not, create a new cart
    if(!cart){
        cart = await prisma.cart.create({
            data: { session_id: sessionId, totalPrice: 0 },
        });
    }
    // Check if the item exists
    const itemId = formdata.get('itemId') as string;
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
        throw new Error('Item not found');
    }
    // Create a cart item
    const cartItem = await prisma.cartItem.findFirst({
        where: { cart_id: cart.id, item_id: itemId },
    });
    if(cartItem){
        // If the item already exists in the cart, increment the quantity
        await prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: { increment: 1 } },
        });
    }else{
        // If the item does not exist in the cart, create a new cart item
        await prisma.cartItem.create({
            data: { cart_id: cart.id, item_id: itemId, quantity: 1 },
        });
    }
    
    await updateCartTotalPrice(cart.id);
}


export async function addItemToCartOnClick( itemId : string ) : Promise<void> {
    // Check if the item exists
    const cartItemId = itemId;
    const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
    });
    if (!cartItem) {
        throw new Error('Cart item not found');
    }
    // Add the item to the cart
    await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: { increment: 1 } },
    });
   
        

    // Update the cart total price
    await updateCartTotalPrice(cartItem.cart_id);
}

export async function removeItemFromCartOnClick(itemId : string) : Promise<void> {
    // Get the cart item
    const cartItemId = itemId;
    const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
    });
    if (!cartItem) {
        throw new Error('Cart item not found');
    }
    // Check if the cart item has a quantity greater than 1
    if (cartItem.quantity > 1) {
        // If so, decrement the quantity
        await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity: { decrement: 1 } },
        });
    } else {
        // If not, delete the cart item
        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }

    // Update the cart total price
    await updateCartTotalPrice(cartItem.cart_id);

}

