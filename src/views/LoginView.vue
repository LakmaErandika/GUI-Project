<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('emilys') // Pre-filled for easy testing!
const password = ref('emilyspass')
const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  const success = await authStore.login(username.value, password.value)
  isLoading.value = false
  
  if (success) {
    router.push('/') // Redirect to home on success
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border dark:border-gray-700 transition-colors">
    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Sign In to VueStore</h2>
    
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div v-if="authStore.isError" class="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
        Invalid username or password. Please try again.
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
        <input v-model="username" type="text" required 
               class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
        <input v-model="password" type="password" required 
               class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
      </div>
      
      <button type="submit" :disabled="isLoading" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50">
        {{ isLoading ? 'Signing In...' : 'Log In' }}
      </button>
    </form>
  </div>
</template>