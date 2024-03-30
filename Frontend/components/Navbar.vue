<template>
	<div>
		<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
			<div class="container-fluid">
				<NavbarBrand />
				<button
				@click="toggleNavbar"
				type="button"
				class="navbar-toggler"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div :class="{ 'collapse': !isNavbarOpen }" class="navbar-collapse" id="navbarNav">
					<NavbarLinks/>
				</div>
			</div>
		</nav>
	</div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const isNavbarOpen = ref(false);
const isLargeScreen = ref(false);

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 576;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});
</script>

