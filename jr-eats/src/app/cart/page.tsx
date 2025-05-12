// app/cart/page.tsx

import Navbar from "@/components/Navbar/Navbar";

const CartPage = () => {
    // Hardcoded cart items
    const cartItems = [
      {
        id: "1",
        name: "Meat Bowl",
        price: 10.99,
        quantity: 2,
        imageUrl: "/images/meat-bowl.jpg",
      },
      {
        id: "2",
        name: "Veggie Bowl",
        price: 8.99,
        quantity: 1,
        imageUrl: "/images/veggie-bowl.jpg",
      },
    ];
  
    // Calculate total price
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
    return (
      <div>
        <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center">Your Cart</h1>
  
        {/* If no items in the cart */}
        {cartItems.length === 0 ? (
          <p className="text-center text-lg mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-10">
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Price: ${item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
  
            {/* Total Price */}
            <div className="mt-6 flex justify-between items-center text-xl font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
  
            {/* Checkout Button */}
            <div className="mt-6 text-center">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    );
  };
  
  export default CartPage;