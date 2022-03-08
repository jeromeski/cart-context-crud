import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from "react";
import { useLocalStorage } from "react-use";

import cartReducer, {
  ADD_ITEM,
  REMOVE_ITEM,
  initialState,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY
} from "./cart-reducer";

import { getItem } from "./cart-utils";

const cartContext = createContext();

cartContext.displayName = "CartContext";

export function useCart() {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error("useCart must be within CartProvider");
  }
  return context;
}

function CartProvider(props) {
  const [savedCart, handleCart] = useLocalStorage(
    `travel:cart`,
    JSON.stringify(initialState)
  );

  const [state, dispatch] = useReducer(cartReducer, JSON.parse(savedCart));
  console.log(state);

  useEffect(() => {
    handleCart(JSON.stringify(state));
  }, [state, handleCart]);

  const increaseQty = (item, qty) => {
    dispatch({
      type: INCREASE_QUANTITY,
      item,
      qty
    });
  };

  const decreaseQty = (item, qty) => {
    dispatch({
      type: DECREASE_QUANTITY,
      item,
      qty
    });
  };

  const isInCart = (id) => !!getItem(state.items, id);

  const getItemFromCart = (id) => getItem(state.items, id);

  const value = useMemo(
    () => ({
      state,
      increaseQty,
      decreaseQty,
      // clearItemFromCart,
      getItemFromCart,
      isInCart
    }),
    [state]
  );

  return <cartContext.Provider value={value} {...props} />;
}

export default CartProvider;
