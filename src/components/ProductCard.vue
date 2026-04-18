<script setup lang="ts">
import type { Product } from '../types'
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'

defineProps<{ product: Product }>()
const cartStore = useCartStore()
</script>

<template>
  <div class="group flex flex-col h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm transition-colors">
    
    <RouterLink :to="`/product/${product.id}`" class="block flex-grow">
      
      <div class="aspect-[4/3] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 p-4 transition-colors">
        <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      
      <div class="p-6 flex flex-col flex-grow gap-3 transition-colors">
        <div class="flex items-center justify-between gap-3">
          <h3 class="text-lg font-bold text-gray-950 dark:text-white line-clamp-1 group-hover:text-blue-600 transition" :title="product.title">
            {{ product.title }}
          </h3>
          <span class="text-sm font-semibold text-green-600 dark:text-green-500">{{ product.discountPercentage }}% OFF</span>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed flex-grow">
          {{ product.description }}
        </p>
        
        <div class="flex items-end justify-between gap-4 mt-auto">
          <div class="flex flex-col gap-0.5">
            <p class="text-sm text-gray-500 dark:text-gray-500 line-through">${{ product.price.toFixed(2) }}</p>
            <p class="text-2xl font-extrabold text-blue-600 dark:text-blue-500 transition-colors">${{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}</p>
          </div>
          <span class="text-xs font-medium text-gray-500 dark:text-gray-500 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 transition-colors">{{ product.category }}</span>
        </div>
      </div>
    </RouterLink>

    <div class="p-6 pt-0 mt-auto transition-colors">
      <button 
        @click="cartStore.addToCart(product)" 
        class="w-full bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-md active:scale-95 group-hover:shadow-lg"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>