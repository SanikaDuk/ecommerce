import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).cartItems
    : [],
  shippingAddress: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).shippingAddress
    : {},
};

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty, size, color } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === product._id && x.size === size && x.color === color);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.size === size && x.color === color ? { ...x, qty } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...product, qty, size, color }];
      }

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.cartItems = state.cartItems.filter((x) => !(x._id === id && x.size === size && x.color === color));

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(Number(state.itemsPrice) > 150 ? 0 : 10);
      state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateCartQty: (state, action) => {
      const { id, size, color, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x._id === id && x.size === size && x.color === color ? { ...x, qty } : x
      );

      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      state.shippingPrice = addDecimals(Number(state.itemsPrice) > 150 ? 0 : 10);
      state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice));
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = addDecimals(0);
      state.shippingPrice = addDecimals(0);
      state.totalPrice = addDecimals(0);
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateCartQty, saveShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
