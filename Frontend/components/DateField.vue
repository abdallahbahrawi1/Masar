<template>
  <div>
    <select class="month" @change="updateDaysByMonth($event)">
      <option value="month">Month</option>
      <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}</option>
    </select>
    <select class="days" @change="updateDay($event)">
      <option value="days">Days</option>
      <option v-for="(day, index) in days" :key="index" :value="day">{{ day }}</option>
    </select>
    <select class="year" @change="updateDaysByYear($event)">
      <option value="year">Year</option>
      <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
    </select>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const emit = defineEmits(["sendDateToParent"])
  const days = ref([])
  const props = defineProps(['rowToEdit'])
  const dateWhenEdit = ref(props.rowToEdit && props.rowToEdit.birth_date ? props.rowToEdit.birth_date.split('T')[0] : null);
    
  const selectedMonth = ref(dateWhenEdit.value ? dateWhenEdit.value.split('-')[1] : 0);
  const selectedDay = ref(dateWhenEdit.value ? dateWhenEdit.value.split('-')[2] : 0);
  const selectedYear = ref(dateWhenEdit.value ? dateWhenEdit.value.split('-')[0] : 0);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 99 + i);

  function updateDaysByMonth(value) {
    if(value.target.value !== "month"){
      selectedMonth.value = Number(value.target.value);
      days.value = getDaysInMonth(selectedYear.value, selectedMonth.value);
      emit("sendDateToParent", {selectedMonth: selectedMonth.value, selectedDay: selectedDay.value, selectedYear: selectedYear.value})
    }
  }

  function updateDaysByYear(value) {
    if(value.target.value !== "year"){
      selectedYear.value = Number(value.target.value);
      // console.log( selectedYear.value )
      emit("sendDateToParent", {selectedMonth: selectedMonth.value, selectedDay: selectedDay.value, selectedYear: selectedYear.value})
    }
  }

  function updateDay(value) {
    if(value.target.value !== "days"){
      selectedDay.value = Number(value.target.value);

      // selectedYear.value = Number(value.target.value);
      days.value = getDaysInMonth(selectedYear.value, selectedMonth.value);
      emit("sendDateToParent", {selectedMonth: selectedMonth.value, selectedDay: selectedDay.value, selectedYear: selectedYear.value})
    }
  }

</script>


<style>
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 16px; 
  }

  option {
    font-size: 16px; 
  }
</style>