import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo / Brand */}
      <Link href="/" className="text-2xl font-bold text-green-600">
        JREats
      </Link>

      {/* Cart Button */}
     <Link
        href="/cart"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
      >
          Cart
      </Link>
    </nav>
  );
};

export default Navbar;