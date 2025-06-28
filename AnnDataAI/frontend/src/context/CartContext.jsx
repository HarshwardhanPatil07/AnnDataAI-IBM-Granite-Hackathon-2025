import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state for the cart
const initialCartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity + action.payload.quantity,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice:
            state.totalPrice + action.payload.price * action.payload.quantity,
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, action.payload],
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice:
            state.totalPrice + action.payload.price * action.payload.quantity,
        };
      }

    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;

      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        items: filteredItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };

    case "UPDATE_QUANTITY":
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex === -1) return state;

      const updatedItems = [...state.items];
      const item = updatedItems[itemIndex];
      const quantityDiff = action.payload.quantity - item.quantity;

      updatedItems[itemIndex] = {
        ...item,
        quantity: action.payload.quantity,
      };

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + item.price * quantityDiff,
      };

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
};

// Create the context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("agriShopCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Initialize with saved cart by dispatching actions for each item
        parsedCart.items.forEach((item) => {
          dispatch({
            type: "ADD_ITEM",
            payload: item,
          });
        });
      } catch (error) {
        console.error("Failed to parse saved cart", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("agriShopCart", JSON.stringify(cart));
  }, [cart]);

  // Methods to interact with the cart
  const addItem = (product, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  const removeItem = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
