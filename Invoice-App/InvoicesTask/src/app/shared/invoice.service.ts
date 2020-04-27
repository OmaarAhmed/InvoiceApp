import { Injectable } from '@angular/core';
import { Invoice } from './invoice.model';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Item } from './item.model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  formData : Invoice;
  InvChanges = new Subject<Invoice>();

  readonly getURL ="https://localhost:5001/api/Invoices"
  readonly postURL ="https://localhost:5001/api/Invoices"

  InvListChanges = new Subject<Invoice[]>();
  CustListChanges = new Subject<Invoice[]>();
  ItemListChanges = new Subject<Item[]>();

   invoiceList2:Invoice[] = [];
   CustomerList:any[] = [];
   itemsList:Item[] = [];
   // = [
   //   {InvoiceID: 1, ClientName: 'Vilnius',DueDate:'6556',Price:25},
   //   {InvoiceID: 2, ClientName: 'feew',DueDate:'6556',Price:453},
   //   {InvoiceID: 3, ClientName: 'bv',DueDate:'6556',Price:24}
   // ]
  constructor(private http : HttpClient) { }

  // refreshList(invoice: Invoice){
  //  this.invoiceList2.push(invoice);
  //  //this.InvListChanges.next(this.invoiceList2);
  // }
  GetCustomers(){
    let URLE:string="https://localhost:5001/api/Customers"
    this.http.get<any[]>(URLE)//.pipe(map(emps => {return emps.map(emp => { return{...emp, Items: emp.Items ? emp.Items : []} });}))
    .subscribe(emps => {
        //this.invoiceList2 = emps;
        this.SetCustomersList(emps);
    })
  }
  SetCustomersList(arr: Invoice[]){
    this.CustomerList = arr;
    this.CustListChanges.next(this.CustomerList);
  }
//-------------------------------------- Get Invoices ---------------------------------
     GetInvoices(){
  this.http.get<any[]>(this.getURL)//.pipe(map(emps => {return emps.map(emp => { return{...emp, Items: emp.Items ? emp.Items : []} });}))
  .subscribe(emps => {
      //this.invoiceList2 = emps;
      this.SetInvoiceList(emps);
  })
}
SetInvoiceList(arr: Invoice[]){
  this.invoiceList2 = arr;
  this.InvListChanges.next(this.invoiceList2);
}
//-------------------------------------- Post Invoice ---------------------------------
  SetInvoice(invoice: Invoice){
    this.formData = invoice;
    this.InvChanges.next(this.formData);
    //
    this.ItemsPerInvoice(invoice.InvoiceID)
}

// PostInvoice(invoice: Invoice) {
//   return new Promise((resolve, reject) => {
//     this.http.post<Invoice>(this.postURL, invoice).subscribe(
//       response => { 
//         console.log(response);
//         this.GetInvoices() })
//       resolve();
//   });
// }

  PostInvoice(invoice: Invoice){
    this.http.post<Invoice>(this.postURL, invoice).subscribe(
      response => { 
        console.log(response);
        this.GetInvoices() });
  }

  PutInvoice(invoice: Invoice){
    let URLE:string="https://localhost:5001/api/Invoices/"+invoice.InvoiceID
    this.http.put(URLE,invoice).subscribe(
      response => { 
        console.log(response);
        this.GetInvoices() });
  }

  DeleteInvoice(id: number){ //id: number
    let URLd:string="https://localhost:5001/api/Invoices/"+id
    this.http.delete(URLd).subscribe(
     response => { 
      console.log(response);
      this.GetInvoices() });
  }
//-------------------------------------- Items Per Invoice ---------------------------------
//-------------------------------------- Add item ---------------------------------
PostItem(item: any){
  let URL:string="https://localhost:5001/api/Items"
  this.http.post<any>(URL, item).subscribe(
    response => { 
      console.log(response);
      }); // this.GetInvoices()
}

PutItem(item: any){
  let URLE:string="https://localhost:5001/api/Items/"+item.ItemID
  this.http.put(URLE,item).subscribe(
    response => { 
      console.log(response);
      }); //this.GetInvoices() 
}

ItemsPerInvoice(id: number){
    let URLd:string="https://localhost:5001/api/Items/ItemsPerInvoice/"+id
    this.http.get<any[]>(URLd)//.pipe(map(emps => {return emps.map(emp => { return{...emp, Items: emp.Product ? emp.Product : []} });}))
    .subscribe(emps => {
        //this.invoiceList2 = emps;
        this.SetItemList(emps);
        //console.log(emps);
    })
  }
  SetItemList(arr: Item[]){
    this.itemsList = arr;
    this.ItemListChanges.next(this.itemsList);
  }

}
