# Me

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


## Deploy to Cloudflare Workers

The Worker serves the Vite build in `dist` as static assets, with an
`index.html` fallback for single-page app navigation.

Use these settings in Cloudflare Workers Builds:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

To build and deploy locally, run `npm run deploy`. To preview the built site
with Workers locally, run `npm run workers:dev`.

To validate the deployment configuration without publishing:

```sh
npm run build
npx wrangler deploy --dry-run
```

