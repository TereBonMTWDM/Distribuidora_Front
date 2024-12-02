import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './cmp/shared/navbar/navbar.module';
import { FooterModule } from './cmp/shared/footer/footer.module';
import { FixedpluginModule } from './cmp/shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './cmp/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './cmp/layouts/auth/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';

//Traslate of PrimeNg
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient } from "@angular/common/http";


import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { LoadingInterceptor } from './core/loading.interpector';
import { InventarioModule } from './private/inventario/inventario.module';

registerLocaleData(localeEs, 'es-MX');

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpClientModule,

    // MaterialModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule
    , AngularFireModule.initializeApp(environment.firebaseConfig)
    , AngularFireAuthModule
    , BrowserModule,

    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
     InventarioModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es-MX'},
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
