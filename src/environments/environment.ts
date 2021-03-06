// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../package.json');

export const environment = {
  appName: 'Angular Ngrx Material Starter',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  firebaseConfig :{
    apiKey: "AIzaSyB2T-vKNN22pcxLkId4BD1O8jNoIJwMGOM",
    authDomain: "university-111.firebaseapp.com",
    databaseURL: "https://university-111.firebaseio.com",
    projectId: "university-111",
    storageBucket: "",
    messagingSenderId: "1042476804374",
    appId: "1:1042476804374:web:692dbb0e0aecf05a"
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  }
};
