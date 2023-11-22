import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/home/app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyComponent } from './modules/currency/currency.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        CurrencyComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        CurrencyComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
