<template>
    <div class="container-fluid">
      <form class="signup-form mx-auto" @submit.prevent="handleSubmit">
        <h4 class="text-center">Sign Up</h4>
        <div class="mb-3">
            <label for="first_name" class="first_name">First Name</label>
            <input type="text" v-model="firstName" class="form-control" id="first_name" required>
        </div>
        <div class="mb-3">
            <label for="last_name" class="form-label">Last Name</label>
            <input type="text" v-model="lastName" class="form-control" id="last_name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" required>
        </div>
        <div class="mb-3">
          <label for="confirmation_password" class="form-label">confrim Password</label>
          <input type="password" v-model="confrimationPassword" class="form-control" id="confirmation_password" required>
        </div>

        <button type="submit" class="btn btn-primary mt-4">Sign Up</button>

      </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const errors = ref('');
const confrimationPassword = ref('');


const handleSubmit =  async () => {
  try {
    await axios.post("http://localhost:4000/users/signup", {
      email: email.value,
      password: password.value,
      first_name: firstName.value,
      last_name: lastName.value,
      confrimation_password : confrimationPassword.value
    });
    await navigateTo('/')
  } catch (error) {
    errors.value = error.response.data.error;
    console.log(errors.value)
  }
}
</script>
      
<style>
  
  form{
  width: 40%;
  background-color: white ;
  padding: 50px;
  border-radius: 20px;
  margin-top:15px;
  }
  
  .btn-primary{
  width: 100%;
  border: none;
  border-radius: 50px;
  background: linear-gradient(98deg, rgba(2, 0, 36, 1) 0%, rgba(75, 14, 154, 1)  35%, rgba(0, 212, 255, 1) 100%);
  }
  
  .form-control{
  color: rgba(0, 0, 0, 0.42);
  border-bottom-color: rgba(0, 0, 0, 0.42);
  box-shadow: none !important;
  border: none;
  border-bottom: 1px solid;
  border-radius: 4px 4px 0 0;
  }
  
  .login-form h4 {
  font-size: 2rem !important;
  font-weight: 700;
  }
  
  .form-label {
  font-family: 800 !important;
  }
  
  .signup-link {
    color: #007bff;
    text-decoration: none;
  }
  
  .signup-link:hover {
    text-decoration: underline;
  }
  
  @media only screen and (max-width: 900px){
  form {
      width: 60%;
  }
  }
</style>