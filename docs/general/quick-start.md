### First steps

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

#### Building & Deploying

1.  Run `npm run build`, which will compile all the necessary files to the
    `dist` folder.

2.  Upload the contents of the `dist` folder to your web server's root folder.

#### Component testing

Component tests live in `test.spec.cy.tsx` files right next to the components being tested
and are run with `npm run test`.
