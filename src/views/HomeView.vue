<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import type { Product, ProductResponse } from '../types'

const products = ref<Product[]>([])
const searchQuery = ref('')
const isLoading = ref(true)

// Centralized fetching function using strict interfaces [cite: 15]
const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await fetch('https://dummyjson.com/products?limit=24') // Increased limit for better grid
    if (!response.ok) throw new Error('API request failed')
    const data: ProductResponse = await response.json()
    products.value = data.products
  } catch (error) {
    console.error("Fetch error:", error)
  } finally {
    isLoading.value = false
  }
}

// Implement live client-side filtering 
const filteredProducts = computed(() => {
  return products.value.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(fetchProducts)
</script>

<template>
  <div class="space-y-12">
    
    <div class="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 md:p-12 text-center border dark:border-gray-800 transition-colors">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-950 dark:text-white mb-6 leading-tight">Explore Our Modern Collection</h1>
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">Discover unique products curated just for you, instantly fetch the latest from our(cite: DummyJSON) powered catalog.</p>
      
      <div class="relative max-w-xl mx-auto group">
        <input 
          v-model="searchQuery" 
          type="search" 
          class="block w-full p-5 pl-12 text-lg text-gray-950 border border-gray-300 rounded-2xl bg-white focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-950/40 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-500 dark:text-white transition-all shadow-sm group-hover:shadow" 
          placeholder="Search by product name..." 
        />
        <svg class="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col justify-center items-center h-96 gap-6">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p class="text-lg text-gray-600 dark:text-gray-400 font-medium">Fetching modern goods...</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>

    <div v-if="!isLoading && filteredProducts.length === 0" class="text-center py-24 space-y-6 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-dashed dark:border-gray-800">
      <svg class="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
      <p class="text-2xl font-bold text-gray-800 dark:text-gray-200">No modern products found matching "{{ searchQuery }}"</p>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">Try refining your search query or clear it to explore our complete collection. Good luck!</p>
      <button @click="searchQuery = ''" class="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-2.5 rounded-lg transition">Clear Search</button>
    </div>
  </div>
</template>