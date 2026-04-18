<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700 p-6 md:p-8 transition-colors">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-6">Your cart is currently empty.</p>
      <RouterLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else>
      <ul class="divide-y divide-gray-200 dark:divide-gray-700 mb-8">
        <li v-for="item in cartStore.items" :key="item.id" class="py-6 flex items-center gap-6">
          <img :src="item.thumbnail" :alt="item.title" class="w-24 h-24 object-cover rounded-md border dark:border-gray-600" />
          
          <div class="flex-grow">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              <RouterLink :to="`/product/${item.id}`" class="hover:underline">{{ item.title }}</RouterLink>
            </h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">{{ item.brand }}</p>
          </div>
          
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900 dark:text-white mb-2">${{ item.price }}</p>
            <button @click="cartStore.removeFromCart(item.id)" class="text-sm text-red-500 hover:text-red-700 font-medium">
              Remove
            </button>
          </div>
        </li>
      </ul>

      <div class="border-t dark:border-gray-700 pt-6 flex justify-between items-center">
        <span class="text-2xl font-bold text-gray-900 dark:text-white">Total:</span>
        <span class="text-3xl font-bold text-blue-600 dark:text-blue-400">${{ cartStore.cartTotal }}</span>
      </div>

      <div class="mt-8 flex justify-end">
        <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg" @click="() => alert('Checkout Simulation Successful!')">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>