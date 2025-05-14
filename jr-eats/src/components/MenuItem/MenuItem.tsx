"use client";
import { addItemToCart } from "@/actions/actions";
import React from "react";

type MenuItemProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
};


const MenuItem: React.FC<MenuItemProps> = ({
  id,
  title,
  description,
  price,
  imageSrc,
}) => {
  return (
    <form action={addItemToCart}>
      <input type="hidden" name="itemId" value={id} />
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
          type="submit"
        >
          Add to Cart
        </button>
      </div>
    </form>
  );
};

export default MenuItem;
