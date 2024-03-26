<template>
    <div class="col-md-6 col-lg-2">
        <div class="links">
        <h5 class="text-light">{{ title }}</h5>
        <ul class="list-unstyled lh-lg">
            <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    items: Array,
    title: String
});
</script>