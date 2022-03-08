import {
  calculateItemsSubTotalAmount,
  calculateItemsTotalAmount,
  calculateItemsTotalQuantity,
  calculateUniqueItems
} from "./cart-utils";

export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const RESET_CART = "RESET_CART";

export const initialState = {
  items: [
    {
      _id: 0,
      name: "Experience the natural beauty of island",
      price: 1100,
      qty: 1,
      image: "img5"
    },
    {
      _id: 1,
      name: "Sunset view of beautiful lakeside resident",
      price: 1160,
      qty: 1,
      image: "img6"
    },
    {
      _id: 2,
      name: "Vacation to the water city of Portugal",
      price: 1400,
      qty: 1,
      image: "img7"
    }
  ],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  meta: null
};

function cartReducer(state, action) {
  switch (action.type) {
    case INCREASE_QUANTITY: {
      const items = state.items.map((item) =>
        item._id === action.item._id
          ? {
              ...item,
              qty: action.qty ? item.qty + action.qty : item.qty + 1
            }
          : item
      );
      return generateFinalState(state, items);
    }
    case DECREASE_QUANTITY: {
      let targetIdx = state.items.findIndex(
        (existingItem) => existingItem._id === action.item._id
      );
      // console.log(`$The target element's idx is ${targetIdx}`, state.items[targetIdx].qty);
      if (state && state.items[targetIdx].qty === 0) {
        return state;
      } else {
        const items = state.items.map((item) =>
          item._id === action.item._id
            ? {
                ...item,
                qty: action.qty ? item.qty - action.qty : item.qty - 1
              }
            : item
        );
        return generateFinalState(state, items);
      }
    }
    default:
      return state;
  }
}

const generateFinalState = (state, items) => {
  const totalUniqueItems = calculateUniqueItems(items);
  return {
    ...state,
    items: calculateItemsSubTotalAmount(items),
    totalItems: calculateItemsTotalQuantity(items),
    totalUniqueItems,
    total: calculateItemsTotalAmount(items),
    isEmpty: totalUniqueItems === 0
  };
};

export default cartReducer;
