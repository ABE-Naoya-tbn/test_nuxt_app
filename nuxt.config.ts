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
})
