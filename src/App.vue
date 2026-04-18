<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors flex flex-col font-sans">
    
    <NavBar />
    
    <main class="container mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow">
      <RouterView />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-auto transition-colors">
      <div class="container mx-auto px-4 md:px-6 py-8 md:py-10 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          &copy; 2026 VueStore SPA. All rights reserved. Built with Vue 3, TypeScript, and Tailwind CSS.
        </p>
        <div class="mt-4 flex justify-center space-x-6 text-sm">
          <a href="#" class="text-gray-500 hover:text-blue-600">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-blue-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>