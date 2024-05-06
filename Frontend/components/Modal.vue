<template>
  <div>
    <div class="modal-container">
      <div class="modal" ref="deleteModalRef">
        <div class="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input v-model="fullname" ref="inputField" type="fullname" />
        </div>
        <div class="form-group">
          <label htmlFor="email">Email: </label>
          <input v-model="email" type="email" />
        </div>
        <div class="form-group" v-if="!props.rowToEdit">
          <label htmlFor="password">Password: </label>
          <input v-model="password" type="password" />
        </div>
        <div class="form-group">
          <label htmlFor="mobile">Mobile: </label>
          <input v-model="mobile" type="mobile" />
        </div>
        <div class="form-group">
          <label htmlFor="birthdate">Birth Date:</label>
          <DateField @sendDateToParent="sendDateToParent" :rowToEdit/>
        </div>
        <p v-if="error.length > 0" class="text-red-500">{{ error }}</p>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full btn" @click="handleSubmit($event)">{{rowToEdit ? "Update" : "Add"}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onClickOutside } from '@vueuse/core'
  import axios from 'axios';
  const emit = defineEmits(["closeModal", "sendFormDateToParent"])
  const props = defineProps(['rowToEdit'])
  
  const rowToEdit = ref(props.rowToEdit);

  const selectedMonth = ref(0);
  const selectedDay = ref(0);
  const selectedYear = ref(0);

  const id = ref(props.rowToEdit ? props.rowToEdit.id : 0);
  const fullname = ref(props.rowToEdit ? props.rowToEdit.first_name : "");
  const email = ref(props.rowToEdit ? props.rowToEdit.email : "");
  const password = ref("");
  const mobile = ref(props.rowToEdit ? props.rowToEdit.mobile : "");
  const error = ref("")
  
  function sendDateToParent(item: any){
    selectedMonth.value = item.selectedMonth;
    selectedDay.value = item.selectedDay; 
    selectedYear.value = item.selectedYear; 
  }
  
  const handleClose = (event: any) => {
    if(event.key === 'Escape'){
      closeModal();
    }
  }
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(rowToEdit.value)
    if(rowToEdit.value){
      await updateUser();
    }else{
      await addUser()
    }
  }

  async function updateUser(){
    try {
      if(selectedMonth.value === 0 || selectedDay.value === 0 || selectedYear.value === 0){
        throw "Please fill the birth-date" ;
      }
      const [firstName = "", lastName = ""] = fullname.value.split(' ');
      const date = new Date(selectedYear.value, selectedMonth.value, selectedDay.value)
      const formState = {
        first_name: firstName,
        last_name: lastName,
        email: email.value,
        mobile: mobile.value,
        birth_date: date.toISOString().split('T')[0],
      };

      try {
        await axios.put("http://localhost:4000/users/signup"+id, formState, {
          withCredentials: true
        });
        closeModal();
      } catch (e: any) {
        error.value = e.response.data.error;
      }
    } catch (e: any) {
      error.value = e;
    }
  }

  async function addUser(){
    try {
      if(selectedMonth.value === 0 || selectedDay.value === 0 || selectedYear.value === 0){
        throw "Please fill the birth-date" ;
      }
      const [firstName = "", lastName = ""] = fullname.value.split(' ');
      const date = new Date(selectedYear.value, selectedMonth.value, selectedDay.value)
      const formState = {
        first_name: firstName,
        last_name: lastName,
        email: email.value,
        password: password.value,
        mobile: mobile.value,
        birth_date: date.toISOString().split('T')[0],
      };

      try {
        await axios.post("http://localhost:4000/users/signup", formState, {
          withCredentials: true
        });
        closeModal();
      } catch (e: any) {
        error.value = e.response.data.error;
      }
    } catch (e: any) {
      error.value = e;
    }
  }
  
  const deleteModalRef = ref(null);
  onClickOutside(deleteModalRef, closeModal)

  function closeModal(){
    emit("closeModal");
  }

  onMounted(() => {
    document.addEventListener('keyup', handleClose)
  })

  onUnmounted(() => {
    document.removeEventListener('keyup', handleClose)
  })


</script>

<style>
  .modal-container {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal {
    border-radius: 5px;
    padding: 2rem;
    background-color: white;
    width: 25em;
  }

  .modal .btn {
    display: block;
    margin: auto;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-group input{
    border: 1px solid black;
    border-radius: 0.3rem;
    padding: 0.3rem;
    font-size: 1rem;
  }
  .form-group label{
    margin-bottom: 0.2rem;
  }
</style>