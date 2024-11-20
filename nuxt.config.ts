// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  ssr: false,
  css: [
    "~/css/style.css",
    "toastr/build/toastr.min.css"
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://unpkg.com/98.css" },
      ],
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  imports: {
    dirs: ['stores']
  },
  typescript: {
    strict: true
  },
});
