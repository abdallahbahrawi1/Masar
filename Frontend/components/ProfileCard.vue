<template>
  <div class="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
    <div class="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
      <img class="w-32 mx-auto rounded-full -mt-20 border-8 border-white" :src="profile_image" alt="">
      <div class="text-center mt-2 text-3xl font-medium">{{ first_name }} {{ last_name }}</div>
      <div class="text-center mt-2 font-light text-sm">@{{ username }}</div>
      <div class="text-center font-normal text-lg">{{ email }}</div>
      <div class="px-6 text-center mt-2 font-light text-sm">
        <p>
          {{ description }}
        </p>
      </div>
      <hr class="mt-8">
      <div class="flex p-4">
        <div class="w-1/2 text-center">
          <span class="font-bold">1.8 k</span> Followers
        </div>
        <div class="w-0 border border-gray-300">
          
        </div>
        <div class="w-1/2 text-center">
          <span class="font-bold">2.0 k</span> Following
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    first_name: String,
    last_name: String,
    profile_image: String,
    username: String,
    email: String,
    description: String
  })

  

</script>

<style>

</style>