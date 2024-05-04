// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : { //firebase authentication / config
    apiKey: "AIzaSyBImlyA4dsh7TnsdUs24X7NkLr5H_0Wd18",
    authDomain: "galapia-act10-crud.firebaseapp.com",
    projectId: "galapia-act10-crud",
    storageBucket: "galapia-act10-crud.appspot.com",
    messagingSenderId: "138434326899",
    appId: "1:138434326899:web:1d63fa16fdea1b021a9506"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
