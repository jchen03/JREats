"use client";
import React from "react";

type MenuItemProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
};

const handleAddToCart = async(id : string) => {
  try {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId: id, // replace with actual item ID
        quantity: 1,
      }),
    });

    if (res.ok) {
      console.log("Item added to cart!");
      // Optionally update UI or show a toast
    } else {
      console.error("Failed to add item to cart.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  title,
  description,
  price,
  imageSrc,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <img
        src={imageSrc}
        alt={title}
        className="w-48 h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-center mt-2">{description}</p>
      <span className="text-lg font-bold text-green-600 mt-3">${price.toFixed(2)}</span>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition"
        onClick={() => handleAddToCart(id)}
        type="button"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
