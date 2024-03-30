<template>
  <div>
    <template v-if="showNavbar">
      <Navbar/>
    </template>
    <div>
      <slot/>
    </div>
    <template v-if="showFooter">
      <Footer/>
    </template>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showNavbar: true, // Control whether to show Navbar or not
      showFooter: true, // Control whether to show Footer or not
    };
  },
  created() {
    // Check the route and hide Navbar/Footer if on the login page
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      // Get current route path from Vue Router
      const currentRoute = this.$route.path;

      // Define paths where Navbar and Footer should be hidden
      const hiddenPaths = ['/login']; // Add more paths if needed

      // Check if the current route is in the hidden paths
      if (hiddenPaths.includes(currentRoute)) {
        this.showNavbar = false;
        this.showFooter = false;
      }
    }
  },
  watch: {
    // Watch for route changes and update Navbar/Footer visibility
    $route(to, from) {
      this.checkRoute();
    }
  }
};
</script>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>
