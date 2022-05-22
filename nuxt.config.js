export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'calendar-nuxt2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  auth: {
    redirect: {
      login: '/', // redirect user when not connected
      callback: '/callback',
    },
    strategies: {
      // local: false,
      // auth0: {
      //   logoutRedirectUri: 'http://localhost:3000/',
      //   domain: "dev-6xt88t3o.us.auth0.com",
      //   clientId: "uDJuNWsShdrC2u3y15Rb4qikmm618jn3",
      //   scope: ['openid', 'profile', 'email', 'offline_access'],
      //   responseType: 'token',
      //   grantType: 'authorization_code',
      //   codeChallengeMethod: 'S256',
      // },
      openIDConnect: {
        scheme: 'openIDConnect',
        clientId: 'uDJuNWsShdrC2u3y15Rb4qikmm618jn3',
        endpoints: {
          configuration: 'https://accounts.google.com/.well-known/openid-configuration',
        },
        idToken: {
          property: 'id_token',
          maxAge: 60 * 60 * 24 * 30,
          prefix: '_id_token.',
          expirationPrefix: '_id_token_expiration.'
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'offline_access'],
        codeChallengeMethod: 'S256',
      }
    }
  },

  serverMiddleware: ['@/server-middleware/auth']
}
