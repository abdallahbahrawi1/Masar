<template>
  <div class="login-view">
    <LoginForm class="LoginForm"/>
  </div>
</template>

<script setup>

</script>

<style>
body{
    overflow: hidden;
}

.login-view {
  height: 100vh; 
  width: 100vw;
  background-image: url('../public/img/masar.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.LoginForm {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>