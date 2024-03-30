<template>
  <div>
    <Navbar/>
  </div>
  <div>
    <slot/>
  </div>
  <div>
    <Footer/>
  </div>
</template>


<style scoped>
.router-link-exact-active {
    color: #12b488;
}
</style>