// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    Cobranza: 'https://localhost:7237/api/',
    Inventario: 'https://localhost:7105/api/'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCtjpOlR9qd85lV7FYtc0kQP4RYyDJhCTU",
    authDomain: "al-maximo-ti.firebaseapp.com",
    projectId: "al-maximo-ti",
    storageBucket: "al-maximo-ti.firebasestorage.app",
    messagingSenderId: "1035440965014",
    appId: "1:1:1035440965014:web:b0410a07cc0d08f26489b7",
    measurementId: "G-R3NRBH7C3Z"
  }
  // firebaseConfig: {
  //   apiKey: "AIzaSyABWZtYxhPZZiAiqXUMTqU4ZHGDWfD116g",
  //   authDomain: "inverser-front.firebaseapp.com",
  //   projectId: "inverser-front",
  //   storageBucket: "inverser-front.appspot.com",
  //   messagingSenderId: "879285539504",
  //   appId: "1:879285539504:web:ed92f45942b5da3fa3a175"
  // }

};