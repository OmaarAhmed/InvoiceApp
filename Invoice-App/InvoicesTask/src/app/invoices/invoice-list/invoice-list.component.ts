import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { Invoice } from 'src/app/shared/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoiceList:Invoice[];
  CustomerList:Invoice[];

  constructor(private service: InvoiceService) {
   }

  ngOnInit(): void {
    this.service.GetInvoices();
    this.service.GetCustomers();
   // this.refreshList();

   this.service.InvListChanges.subscribe(
    (x: Invoice[]) => {
      this.invoiceList = x;
    }
   )

   this.service.CustListChanges.subscribe(
    (x: Invoice[]) => {
      this.CustomerList = x;
      console.log(this.CustomerList);
    }
   )
  }

  populateForm(invoice: Invoice){
     this.service.SetInvoice(invoice);
  }

  onDelete(invoiceId : number){
    this.service.DeleteInvoice(invoiceId);
  }

  // refreshList(){
  //   //console.log(this.invoiceList);
  //   console.log(this.invoiceList);
  // }

}
