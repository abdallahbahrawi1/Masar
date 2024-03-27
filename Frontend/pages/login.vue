<template>
  <div class="signup-login-view">
    <LoginForm class="signup-login-form"/>
  </div>
</template>

<script setup>

</script>

<style>

.signup-login-view {
  height: 100vh; 
  width: 100vw;
  background-image: url('../public/img/masar.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.signup-login-form {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>