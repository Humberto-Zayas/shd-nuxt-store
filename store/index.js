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

      updateLocalStorage(state.cart)
    }
  }
}
