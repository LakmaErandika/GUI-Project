<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="bg-white shadow-sm p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold text-blue-600">Modern E-Commerce</h1>
      </div>
    </header>

    <main class="container mx-auto p-4 mt-4">
      <RouterView />
    </main>
  </div>
</template>