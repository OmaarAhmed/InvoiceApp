import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { InvoiceService } from './shared/invoice.service';

import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    InvoiceListComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, AgGridModule.withComponents([])
  ],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
