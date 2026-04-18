<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useDark, useToggle } from '@vueuse/core'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

// Dark mode toggle using external library [cite: 29]
const isDark = useDark()
const toggleDark = useToggle(isDark)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
    <div class="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-6">
      
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-3xl font-extrabold text-blue-600 dark:text-blue-500 tracking-tight">Vue<span class="text-gray-950 dark:text-white">Store</span></span>
      </RouterLink>
      
      <div class="flex items-center gap-2 sm:gap-4 md:gap-6">
        
        <button @click="toggleDark()" class="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition" aria-label="Toggle theme">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
        
        <RouterLink to="/cart" class="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition group" aria-label="View cart">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span v-if="cartStore.cartCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md group-hover:scale-110 transition">
            {{ cartStore.cartCount }}
          </span>
        </RouterLink>

        <div class="border-l border-gray-200 dark:border-gray-700 pl-4 md:pl-6 flex items-center gap-3">
          <template v-if="authStore.isAuthenticated">
            <img :src="authStore.user?.image" :alt="authStore.user?.username" class="w-9 h-9 rounded-full border border-gray-300" />
            <button @click="handleLogout" class="text-sm font-medium text-red-600 hover:text-red-700 transition">Log Out</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm">Log In</RouterLink>
          </template>
        </div>
        
      </div>
    </div>
  </header>
</template>