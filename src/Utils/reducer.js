import { Type } from "./action.type";

export const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const reducer = (state, action) => {
  switch (action.type) {

    case Type.ADD_TO_CART: {
        const existingItem = state.cart.find(
          (item) => item.id === action.item.id
        );

        let updatedCart;

        if (existingItem) {
          updatedCart = state.cart.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          );
        } else {
          updatedCart = [...state.cart, { ...action.item, amount: 1 }];
        }

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return {
          ...state,
          cart: updatedCart,
        };
      }

    case Type.UPDATE_QTY: {
      const { id, qty } = action;
      let updatedCart;

      if (qty <= 0) {
        // Remove item if quantity is 0 or less
        updatedCart = state.cart.filter((item) => item.id !== id);
      } else {
        // Update quantity
        updatedCart = state.cart.map((item) =>
          item.id === id ? { ...item, amount: qty } : item
        );
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case Type.REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter((item) => item.id !== action.id);
      
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case Type.SET_USER:
          if(action.user) {
            localStorage.setItem("user", JSON.stringify(action.user));
          } else {
            localStorage.removeItem("user");
          }
          return {
            ...state,
            user: action.user,
          };

      case Type.EMPTY_CART:
        localStorage.removeItem("cart");
        return {
          ...state,
          cart: [],
        };

    default:
      return state;
  }
};