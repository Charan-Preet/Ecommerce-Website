import { action } from "easy-peasy";

export default {
    cartItems: [],

    addToCart: action((state, payload) => {
        state.cartItems = [...state.cartItems, payload]
    }),

    increaseCartItem: action((state, payload) => {
        state.cartItems[payload].cart_quantity += 1
    }),

    decreaseCartItem: action((state, payload) => {
        state.cartItems[payload].cart_quantity -= 1
    }),

    removeFromCart: action((state, payload) => {
        state.cartItems = state.cartItems.filter(item => {
            return item._id !== payload
        })
    })
}
