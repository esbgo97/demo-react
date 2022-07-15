import { Product } from "../products/products.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getCartProductSelector,
  getTotalPrice,
  removeFromCart,
} from "./cart.slice";

export interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProductSelector);
  const totalPrice = useAppSelector(getTotalPrice);

  const onRemoveItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <h2>Cart</h2>
      <h5>{totalPrice}</h5>
      {cartProducts.map((pt, i) => (
        <div key={i}>
          <span>{pt.title}</span>
          <span>{pt.price}</span>
          <button onClick={() => onRemoveItemFromCart(pt.id)}>
            Remove From Cart
          </button>
        </div>
      ))}
    </>
  );
};

export default Cart;
