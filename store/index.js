function updateLocalStorage (cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const state = () => ({
  cart: []
})

export const getters = {
//   productQuantity (state, product) {
//     const item = state.cart.find(i => i.id === product.id)
//     if (item) {
//       return item.quantity
//     } else {
//       return null
//     }
//   }
  productQuantity: state => (product) => {
    const item = state.cart.find(i => i.id === product)
    if (item) {
      return item.quantity
    } else {
      return null
    }
  },
  cartItems: (state) => {
    return state.cart
  },
  cartTotal: (state) => {
    return state.cart.reduce((a, b) => a + (b.price * b.quantity), 0)
  }
}

export const mutations = {

  addToCart (state, product) {
    const item = state.cart.find(i => i.id === product.id)

    if (item) {
      item.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
    updateLocalStorage(state.cart)
  },
  removeFromCart (state, product) {
    const item = state.cart.find(i => i.id === product.id)

    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        state.cart = state.cart.filter(i => i.id !== product.id)
      }
    }
    updateLocalStorage(state.cart)
  },
  updateCartFromLocalStorage (state) {
    const cart = localStorage.getItem('cart')
    if (cart) {
      state.cart = JSON.parse(cart)
    }
  }
}
