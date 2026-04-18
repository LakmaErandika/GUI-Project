import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('jwt_token'))
  const user = ref<any>(JSON.parse(localStorage.getItem('user_data') || 'null'))
  const isError = ref(false)

  const login = async (username: string, password: string) => {
    isError.value = false
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        })
      })

      if (!response.ok) throw new Error('Invalid credentials')

      const data = await response.json()
      
      // Store in state
      token.value = data.token
      user.value = data
      
      // Store in localStorage for persistence
      localStorage.setItem('jwt_token', data.token)
      localStorage.setItem('user_data', JSON.stringify(data))
      
      return true
    } catch (error) {
      console.error(error)
      isError.value = true
      return false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_data')
  }

  const isAuthenticated = computed(() => !!token.value)

  return { token, user, isError, login, logout, isAuthenticated }
})