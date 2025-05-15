"use server";

import prisma from "@/lib/db";
import { Item, CartItem, Cart } from "@/generated/prisma";
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get('sessionId')?.value

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    (await cookies()).set('sessionId', sessionId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  }

  return sessionId
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
    
    // Update the cart total price
    const cartItems = await prisma.cartItem.findMany({
        where: { cart_id: cart.id },
        include: {
            item: true, 
        },
    });
    const totalPrice = cartItems.reduce((sum, cartItem) => {
        return sum + cartItem.quantity * cartItem.item.price;
    }, 0);
    
    // Add the item to the cart
    cart = await prisma.cart.update({
        where: { id: cart.id },
        data: {
            totalPrice: totalPrice,
        },
    });
}