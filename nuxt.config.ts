// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      styles: { configFile: '/styles/settings.scss' }
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000',
    },
  },
  ssr: false,
  app: {
    head: {
      title: "NuxtTest",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "favicon.ico" },
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@primer/css@20.8.3/dist/primer.min.css" }
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/@primer/css@20.8.3/dist/primer.min.js" }
      ],
    }
  },
})
