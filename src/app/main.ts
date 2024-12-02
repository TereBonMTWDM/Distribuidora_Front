import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
import { environment } from 'src/environments/environment';



if (environment.production) {
  enableProdMode();
} else if (module['hot']) {
  module['hot'].accept();
}


enableProdMode();
// platformBrowserDynamic().bootstrapModule(AppModule);
