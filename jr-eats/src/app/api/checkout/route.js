import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import prisma from "@/lib/db";
import { stripe } from '../../../lib/stripe'
import { getCartItems } from "@/actions/actions";


export async function POST() {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const cartItems = await getCartItems()

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((cartItem) => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: cartItem.item.name,
            images: [cartItem.imageUrl],
          },
          unit_amount: cartItem.item.price * 100, // Convert to cents
        },
        quantity: cartItem.quantity,
      })),
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}