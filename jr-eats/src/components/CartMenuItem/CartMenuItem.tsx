import { addItemToCartOnClick, getCartItems, removeItemFromCartOnClick } from "@/actions/actions";
import CartPageItemsClient from "./CartMenuItemClient";


export default async function CartPageItems() {
    const cartItems = await getCartItems(); 
    return <CartPageItemsClient items={cartItems} />;
}

