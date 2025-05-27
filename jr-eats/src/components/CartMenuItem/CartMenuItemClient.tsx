"use client";
import { addItemToCartOnClick, getCartItems, removeItemFromCartOnClick } from "@/actions/actions";
import Link from "next/link";
import { use, useEffect, useState, useTransition } from "react";

type CartItem = {
  id: string;
  cart_id: string;
  item_id: string;
  quantity: number;
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        imageUrl: string;
    };
};

const CartPageItemsClient = ({ items }: { items: CartItem[] }) => {
  
    const [cartItems, setCartItems] = useState(items); 
    const [isPending, startTransition] = useTransition();

    
    const totalPrice = cartItems.reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
    }, 0);
    
    

    const handleRemove = async (itemId: string) => {
        startTransition(async () => {
            await removeItemFromCartOnClick(itemId);
            const res = await getCartItems();
            setCartItems(res);
        });
    };

    const handleAdd = async (itemId: string) => {
        startTransition(async () => {
            await addItemToCartOnClick(itemId);
            const res = await getCartItems();
            setCartItems(res);
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold text-center">Your Cart</h1>
    
          {/* If no items in the cart */}
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-lg mt-4">Your cart is empty.</p>
            ) : (
              <div className="mt-10">
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center">
                        <img src={item.item.imageUrl} alt={item.item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="ml-4">
                          <h3 className="font-semibold">{item.item.name}</h3>
                          <p className="text-gray-600">Price: ${item.item.price}/ea</p>
                        </div>
                      </div>
                      {/* Quantity controls */}
                      <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            disabled={isPending}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 rounded"
                          >
                            −
                          </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleAdd(item.id)}
                          disabled={isPending}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 rounded"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                  
                {/* Total Price */}
                <div className="mt-6 flex justify-between items-center text-xl font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
      
                {/* Checkout Button */}
                <form action="/api/checkout" method="POST" className="mt-6">
                  <div className="mt-6 text-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
                      Proceed to Checkout
                    </button>
                  </div>
                </form>                
              </div>
            )}
          </div>
        </div>
    );
  };

export default CartPageItemsClient;