import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "cart/fetchItems", 
  async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/items?populate=image`
      );
      if(!response.ok) {
        throw new Error("Server error")
      }
      const itemsJson = await response.json();
      return itemsJson.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const isItemFound = state.cart.some(
        (item) => item.id === action.payload.item.id
      );
      if (isItemFound) {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            item.count += action.payload.item.count;
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, action.payload.item];
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload
    })
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
