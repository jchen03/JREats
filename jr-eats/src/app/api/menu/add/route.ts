// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";

// export async function POST(req: Request) {
//   const { itemId, quantity } = await req.json();

//   const sessionId = "demo-session-123"; // Replace with real session logic

//   let cart = await prisma.cart.findFirst({ where: { session_id: sessionId } });

//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: { session_id: sessionId, totalPrice: 0 },
//     });
//   }

//   const existing = await prisma.cartItem.findFirst({
//     where: { cart_id: cart.id, item_id: itemId },
//   });

//   if (existing) {
//     await prisma.cartItem.update({
//       where: { id: existing.id },
//       data: { quantity: { increment: quantity } },
//     });
//   } else {
//     await prisma.cartItem.create({
//       data: {
//         cart: { connect: { id: cart.id } },
//         item: { connect: { id: itemId } },
//         quantity,
//       },
//     });
//   }

//   return NextResponse.json({ message: "Added to cart" });
// }
