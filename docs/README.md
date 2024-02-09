# Documentation

## Table of Contents

- [General](general)
  - [Introduction ](general/introduction.md)
  - [CLI Commands](general/commands.md)
  - [Tool Configuration](general/files.md)
  <!-- - [Deployment](general/deployment.md) _(currently Heroku and AWS S3 specific)_ -->
  <!-- - [Debugging](general/debugging.md) -->
  <!-- - [FAQ](general/faq.md) -->
<!-- - [Testing](testing) -->
  <!-- - [Component Testing](testing/component-testing.md) -->
  <!-- - [E2E Testing](testing/e2e-testing.md) -->
<!-- - [Styling (CSS)](css/README.md) -->
  <!-- - [General](css/README.md#next-generation-css) -->
  <!-- - [CSS Support](css/README.md#css-we-support) -->
  <!-- - [Stylesheet](css/README.md#stylesheet) -->
  <!-- - [CSS Modules](css/README.md#css-modules) -->
  <!-- - [Sass](css/README.md#sass) -->
  <!-- - [LESS](css/README.md#less) -->
<!-- - [JS](js) -->
  <!-- - [Redux](js/redux.md) -->
  <!-- - [routing](js/routing.md) -->
<!-- - [Components](components) -->
  <!-- - [BFilter](components/README.md#BFilter) -->
  <!-- - [BTable](components/README.md#BTable) -->
  <!-- - ['CRUD' Page Logic] (components/README.md#CRUD) -->

## Overview

### Quickstart

1.  First, let's launch the sample _Profiteam_ app
    bundled with this project to demo some of its best features:

    ```Shell
    npm run setup && npm start
    ```

2.  Open [localhost:8080](http://localhost:8080) to see it in action.

    - Look below, you can test a simple creation logic of CRUD Page;
    - Edit the file at `./src/components/views/Home/index.tsx` so that the text of
      the `<Button>` component reads "Docs!!!"... [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/) gives
      you a feedback loop with your UI so smooth it's almost conversational!
    - Click on "Docs!!!" button to see React Router in action...
      Now you can share a direct link to that content privately over your LAN or
      globally addressable to any device, anywhere. Not bad for a locally-running
      Single Page App.

3.  Now let's try to build your own app: run

    ```shell
    npm run clean
    ```

    ...and do what you want.

### Development

Run `npm start` to see your app at `localhost:8080`

### Building & Deploying

1.  Run `npm run build`, which will compile all the necessary files to the
    `dist` folder.

2.  Upload the contents of the `dist` folder to your web server's root folder.

### CSS

See the [CSS documentation](./css/README.md) for more information.

### JS

We bundle all your clientside scripts and chunk them into several files using
code splitting where possible. We then automatically optimize your code when
building for production so you don't have to worry about that.

See the [JS documentation](./js/README.md) for more information about the
JavaScript side of things.

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](./testing/README.md)!

#### Browser testing

`npm run start:tunnel` makes your locally-running app globally available on the web
via a temporary URL: great for testing on different devices, client demos, etc!

#### Component testing

Component tests live in `test.spec.cy.tsx` files right next to the components being tested
and are run with `npm run test`.
