// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: ["bootstrap/dist/css/bootstrap.min.css"],
  modules: [
    'nuxt-icon',
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@morev/vue-transitions/nuxt"
  ],
  axios: {
    credentials: true,
    proxy: true,
  },
  tailwindcss: { exposeConfig: true},
  headlessui: { prefix:  "H" },
  app:{
    head: {
      title: 'title 1',
      link:[
        // Favicon
        { rel: "icon", type: "image/x-icon", href: "/icon.svg" },
        //Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ]
    }
  }
})
