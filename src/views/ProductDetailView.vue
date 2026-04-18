<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    // Fetch a single product based on the ID in the URL
    const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)
    if (!response.ok) throw new Error('Product not found')
    
    product.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center py-20">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>

  <div v-else-if="product" class="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border dark:border-gray-700 transition-colors">
    <div class="md:flex">
      <div class="md:w-1/2 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <img :src="product.thumbnail" :alt="product.title" class="max-h-[400px] object-contain drop-shadow-md rounded-lg" />
      </div>
      
      <div class="md:w-1/2 p-8 flex flex-col">
        <button @click="router.back()" class="text-blue-600 dark:text-blue-400 mb-4 self-start hover:underline flex items-center gap-1">
          &larr; Back to Products
        </button>
        
        <div class="uppercase tracking-wide text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">
          {{ product.category }}
        </div>
        <h1 class="block mt-1 text-3xl leading-tight font-bold text-gray-900 dark:text-white mb-4">
          {{ product.title }}
        </h1>
        
        <p class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          ${{ product.price }}
          <span class="text-sm font-normal text-green-600 bg-green-100 px-2 py-1 rounded ml-2">
            {{ product.discountPercentage }}% OFF
          </span>
        </p>
        
        <p class="mt-2 text-gray-600 dark:text-gray-300 mb-8 flex-grow">
          {{ product.description }}
        </p>
        
        <div class="flex items-center gap-4 mt-auto">
          <button @click="cartStore.addToCart(product)" 
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all flex-grow text-center">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-20 text-gray-500 dark:text-gray-400">
    <h2 class="text-2xl font-bold mb-4">Product not found</h2>
    <button @click="router.push('/')" class="text-blue-600 hover:underline">Return to Home</button>
  </div>
</template>