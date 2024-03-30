<template>
  <ul class="navbar-nav">
    <li class="nav-item active">
      <NuxtLink to="/" class="nav-link">Home</NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink to="/about" class="nav-link">About</NuxtLink>
    </li>

    <li class="nav-item">
      <NuxtLink to="/login" class="nav-link" target="_blank">Sign in</NuxtLink>
    </li>

    <li class="nav-item">
      <NuxtLink to="/signup" class="nav-link" target="_blank">Sign Up</NuxtLink>
    </li>
  </ul>
</template>
<script setup lang="ts">
</script>