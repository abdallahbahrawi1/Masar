<template>
  <div class="mt-5">
    <p class="font-bold">Users</p>

    <div
      class="mt-5 overflow-x-auto rounded-md border bg-background scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
    >
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b text-left text-xs">
            <th class="p-4 font-medium uppercase text-muted-foreground">ID</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Full Name</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Email</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Mobile</th>
            <th class="p-4 font-medium uppercase text-muted-foreground">Birth_date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" class="border-b text-left text-sm last:border-b-0 hover:bg-muted" :key="index" >
            <td class="p-4">{{ user.id }}</td>
            <td class="p-4">{{ user.first_name }} {{ user.last_name }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4">{{ user.mobile ? user.mobile : '_'}}</td>
            <td class="p-4">{{ user.birth_date ? user.birth_date.split('T')[0] :  '_'}}</td>
            <td class="p-4">
              <div class="flex items-center gap-3 actions">
                <Icon name="material-symbols:delete-outline" class="h-4 w-4 text-muted-foreground hover:text-red-600 cursor-pointer" @click="handleDeleteRow(user.id)"/>

                <Icon name="heroicons:pencil" class="h-4 w-4 text-muted-foreground" @click="handleEditRow(user)"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- <button>Add</button> -->
  <button type="submit" @click="toggleAddButtun" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full btn">Add</button>

  <Modal v-if="modalOpen" @closeModal="closeModal" @sendFormDateToParent="sendFormDateToParent" :rowToEdit/>
</template>


<script setup>
    import axios from 'axios';
    const users = ref([]);
    const modalOpen = ref(false);
    const rowToEdit = ref(null);

    function toggleAddButtun() {
      modalOpen.value = !modalOpen.value;
      rowToEdit.value = null;
    }

    function closeModal(){
      toggleAddButtun();
    }
    
    function sendFormDateToParent(data){
      users.value = users.value.push(data);
    }

    function handleDeleteRow(userId) {
      users.value = users.value.filter(user => user.id !== userId);
    }

    function handleEditRow(user) {
      rowToEdit.value = user;
      modalOpen.value = true;
    }

    const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/get-users', {
        withCredentials: true
      });
      users.value = response.data;
      // console.log(users.value)
      // if(response.data.loggedIn){
      //   first_name.value = response.data.user.first_name;
      //   email.value = response.data.user.email;
      //   last_name.value = response.data.user.last_name;
      //   if(response.data.user.profile_image) profile_image.value = response.data.user.profile_image;
      //   isLoggedIn.value = response.data.loggedIn;
      // }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  onMounted(getAllUsers);
</script>