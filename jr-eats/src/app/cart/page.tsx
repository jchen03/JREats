
import CartPageItems from "@/components/CartMenuItem/CartMenuItem";
import Navbar from "@/components/Navbar/Navbar";

const CartPage = async () => {
    
  // const [state, formAction] = useFormState(removeItemFromCart, { cart: cart });

    return (
      <div>
        <Navbar />
        <CartPageItems />
      </div>
    );
  };
  
  export default CartPage;