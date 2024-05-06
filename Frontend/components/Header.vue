<template>
    <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <!-- Container of flex -->
      <div class="container flex h-16 items-center justify-between">
        <!-- Logo and page title -->
        <div class="flex items-center gap-3">
          <button
            @click="isOpen = true"
            aria-label="Open menu"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background lg:hidden"
          >
            <span class="sr-only">Button used to open menu</span>
            <Icon name="heroicons:bars-2" />
          </button>
          <!-- Logo -->
          
          <img
            src="../public/img/logo.png"
            alt="Masar logo"
            class="h-7 w-7 object-contain"
          />
          <!-- Page title -->
          <NuxtLink class="text-xl font-bold" to="/">Masar</NuxtLink>
        </div>
  
        <!-- Right side of header -->
        <div class="flex items-center gap-5">
          <button
            @click="toggleTheme"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <Icon name="heroicons:sun" class="h-5 w-5" />
          </button>

          <!-- Profile Dropdown menu -->
          <HMenu v-if="isLoggedIn" as="div" class="relative">
            <HMenuButton
              class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background"
            >
              <img
                :src="profile_image"
                alt="Logged in user"
                class="h-full w-full"
              />
            </HMenuButton>
            <TransitionScale :scale="0.8" origin="top right">
              <HMenuItems
                class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div class="border-b px-3 py-1.5 text-sm">
                  <p class="font-semibold">Hello {{ first_name +" "+ last_name}}</p>

                  <a href="mailto:johndoe@test.com" class="leading-none text-muted-foreground"
                    >{{ email }}</a
                  >
                </div>
                <div class="p-1">
                  <template v-for="(p, i) in profileMenuOptions" :key="i">
                    <HMenuItem v-if="!p.divider" v-slot="{ active }">
                      <NuxtLink
                        :class="[active && 'bg-muted']"
                        class="inline-flex w-full items-center rounded-md p-2 text-sm font-medium"
                        :to="'/' + p.title"
                      >
                        {{ p.title }}
                      </NuxtLink>
                    </HMenuItem>
                    <hr v-if="p.divider" class="my-1" />
                  </template>
                </div>
              </HMenuItems>
            </TransitionScale>
          </HMenu>

          <div v-else class="flex gap-5">
            <NuxtLink to="/login" class="text-sm font-medium hover:text-gray-700">Login</NuxtLink>
            <NuxtLink to="/signup" class="text-sm font-medium hover:text-gray-700">Sign Up</NuxtLink>
          </div>

        </div>
      </div>
      <!-- Mobile menu -->
      <!-- <MobileMenu v-model="isOpen" /> -->
    </header>
</template>
  
<script setup lang="ts">
import axios from 'axios';

  const isLoggedIn = ref(false);
  const first_name = ref("");
  const last_name = ref("");
  const email = ref(""); 
  const profile_image = ref('img/default.png'); 

  const mode = useColorMode();
  const toggleTheme = () => {
      mode.value = mode.value === "dark" ? "light" : "dark";
  };

  // Items that will be displayed in menu
  const profileMenuOptions = [
      { title: "Profile" },
      { title: "Settings" },
      { divider: true },
      { title: "Logout" },
  ];

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users/signin', {
        withCredentials: true
      });
      if(response.data.loggedIn){
        first_name.value = response.data.user.first_name;
        last_name.value = response.data.user.last_name;
        email.value = response.data.user.email;
        profile_image.value = response.data.user.profile_image ? response.data.user.profile_image : 'img/default.png';
        // console.log(first_name.value )
        isLoggedIn.value = response.data.loggedIn;
      }

    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  onMounted(checkAuthStatus);

  // Used to open/close menu
  const isOpen = ref(false);
</script>