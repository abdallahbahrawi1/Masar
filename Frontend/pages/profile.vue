<template>
  <div>
    <ProfileCard :first_name="first_name" :last_name="last_name" :profile_image="profile_image" :username="username" :email="email" :description="description"/>
  </div>
</template>

<script lang="ts" setup>

  import axios from 'axios';

  const isLoggedIn = ref(false);
  const first_name = ref("");
  const last_name = ref("");
  const profile_image = ref('img/default.png'); 
  const username = ref(''); 
  const email = ref('');
  const description = ref(''); 

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/signin', {
        withCredentials: true
      });
      if(response.data.loggedIn){
        first_name.value = response.data.user.first_name;
        email.value = response.data.user.email;
        last_name.value = response.data.user.last_name;
        if(response.data.user.profile_image) profile_image.value = response.data.user.profile_image;
        isLoggedIn.value = response.data.loggedIn;
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  onMounted(checkAuthStatus);
</script>

<style>

</style>