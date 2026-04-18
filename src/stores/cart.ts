import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  // Initialize state from localStorage for persistence
  const items = ref<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'))

  // Watch for changes and update localStorage automatically
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  const addToCart = (product: Product) => {
    // Basic implementation: just push the item. 
    // In a real app, you'd check for duplicates and increment quantity.
    items.value.push(product)
  }

  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const cartCount = computed(() => items.value.length)
  
  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => total + item.price, 0)
  })

  return { items, addToCart, removeFromCart, cartCount, cartTotal }
})