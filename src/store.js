import { createStore } from 'vuex';
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVmODExMGEyNGI1NzAwMjBjNmM2ZmEiLCJpYXQiOjE2MTY4NzE2OTZ9.TNenJK8jwvhcYYetxMXxbvGjGXXywfPM3TTICMrkwms'

const store = createStore({
  state: {
    user: {},
    products: [],
    history: [],
    productReemed: []
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_REDEEM_HISTORY: (state, history) => {
      state.history = history;
    },
    SET_PRODUCT_REEMED: (state, productReemed) => {
      state.history = productReemed;
    },
  },
  actions: {
    GET_USER: async function ({ commit }) {
      const user = await axios.get('https://private-anon-aafd984c2e-aerolabchallenge.apiary-mock.com/user/me', {
        headers: {
          "content-Type": "application/json",
          "accept": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      commit('SET_USER', user)
    },
    GET_PRODUCTS: async function ({ commit }) {
      const products = await axios.get('https://coding-challenge-api.aerolab.co/products', {
        headers: {
          "content-Type": "application/json",
          "accept": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      commit('SET_PRODUCTS', products)
    },
    GET_REDEEM_HISTORY: async function ({ commit }) {
      const history = await axios.get('https://coding-challenge-api.aerolab.co/user/history', {
        headers: {
          "content-Type": "application/json",
          "accept": "application/json",
          "authorization": `Bearer ${token}`
        }
      })
      commit('SET_REDEEM_HISTORY', history)
    },
    ADD_PRODUCT: async function ({ commit }) {
      const productReemed = await axios.post('https://coding-challenge-api.aerolab.co/redeem', {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      commit('SET_PRODUCT_REEMED', productReemed)
    },
  }
})

export default store;