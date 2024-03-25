<template>
    <div>
        <Navbar />
        <div>                
            <slot />
        </div>
    </div>
</template>


<style scoped>
.router-link-exact-active {
    color: #12b488;
}
</style>