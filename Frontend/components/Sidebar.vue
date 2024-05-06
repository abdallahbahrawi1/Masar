<template>
    <aside>
      <div
        class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
      >
        <SidebarItem :links="menu" />
  
        <div class="mt-auto">
          <SidebarItem :links="bottomMenu" />
        </div>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
    const bottomMenu = [
      {
        title: "Settings",
        icon: "heroicons:cog-8-tooth",
      },
      {
        title: "Help",
        icon: "heroicons:question-mark-circle",
      },
      {
        title: "Logout",
        icon: "heroicons:arrow-left-on-rectangle",
      },
    ];
    
    const menu = [
      {
        title: "Dashboard",
        icon: "heroicons:home",
      },
      {
        title: "Users",
        icon: "heroicons:user-group",
        items: [
          { title: "List" },
          { title: "Create" },
          { title: "Edit" },
          { title: "Delete" },
          { title: "Details" },
        ],
      }
    ];
  </script>