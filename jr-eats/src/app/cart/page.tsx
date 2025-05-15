import Navbar from "@/components/Navbar/Navbar";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

const CartPage = async () => {
    // Hardcoded cart items
    // const cartItems = [
    //   {
    //     id: "1",
    //     name: "Meat Bowl",
    //     price: 10.99,
    //     quantity: 2,
    //     imageUrl: "/meatbowl.jpg",
    //   },
    //   {
    //     id: "2",
    //     name: "Veggie Bowl",
    //     price: 8.99,
    //     quantity: 1,
    //     imageUrl: "/saladbowl.jpg",
    //   },
    // ];
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;
    console.log("Session ID:", sessionId);
    const cart = await prisma.cart.findFirst({
      where: { session_id: sessionId },
    });
    const cartItems = await prisma.cartItem.findMany({
      where: { cart_id: cart?.id }, 
      include: {
        item: true,
      },
    });
  
    return (
      <div>
        <Navbar />
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
                          <p className="text-gray-600">Price: ${item.item.price}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
      
                {/* Total Price */}
                <div className="mt-6 flex justify-between items-center text-xl font-semibold">
                  <span>Total:</span>
                  <span>${cart?.totalPrice.toFixed(2)}</span>
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
      </div>
    );
  };
  
  export default CartPage;