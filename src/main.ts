// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app-routing.module';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes) // إضافة التوجيه
//   ]
// }).catch((err) => console.error(err));


import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true
    }),
    // CdkTableModule,
    MatTableModule
  ) // تأكد من تضمينه هنا
    ,
    provideAnimations()
]
}).catch((err) => console.error(err));
