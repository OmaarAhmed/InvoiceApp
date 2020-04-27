import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { Form, NgForm } from '@angular/forms';
import { Invoice } from 'src/app/shared/invoice.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

   datasource: Invoice;
   item:any;
   isCollapsed: boolean = true;

  itemList:Item[];
  Cost:number = 0;
  Myflag:boolean = true;

  type:any;

  rowData = [];

  columnDefs = [
    // {field: 'ItemID',sortable:true,filter:true,editable: false,hidden:true },
    {field: 'InvoiceID' ,sortable:true,filter:true,editable: false},
    {field: 'Product' ,sortable:true,filter:true},
    {field: 'Price',sortable:true,filter:true},
    {field: 'Quantity',sortable:true,filter:true}
];

defaultColDef = {
  flex: 1,
  minWidth: 100,
  editable: true,
};

  constructor(private service :  InvoiceService) {
    //this.datasource =service.formData;
  }

  ngOnInit(): void {

    this.Myflag = true;
    this.resetForm();

    this.service.InvChanges.subscribe(
      (x: Invoice) => {
        this.datasource = x;
      }
    )

    this.service.ItemListChanges.subscribe(
      (x: Item[]) => {
        this.rowData = [];
        this.Myflag = false;
        this.itemList = x;
        if(this.itemList.length>0)
        { this.Cost = 0;
          this.isCollapsed = false;
                 for (let x of this.itemList) {
                     this.Cost = this.Cost + x.Product.Price;
                     this.type =  {ItemID: x.ItemID,InvoiceID: x.InvoiceID,ProductID:x.ProductID ,Product:x.Product.ProductName, Price:x.Product.Price, Quantity: x.Quantity } //ItemID: x.ItemID, 
                     this.rowData.push(this.type)
                    }
        }
        else
        {this.isCollapsed = true;
          this.Cost = 0;}
         console.log(this.itemList);
      }
     )

  }

  resetForm(form? : NgForm){
     if(form != null)
     form.resetForm();

     this.datasource = {
      CustomerID:1,
      InvoiceID: null,
      //
      Customer:{
        CustomerName: '',
        BirthDate: '',
        Phone:0,
        },
      //
      ClientName: '',
      DueDate: '',
      Price: null,
     }
  }

  onDelete(invoiceId : number){
    this.service.DeleteInvoice(invoiceId);
  }

  onItemAdd(){
    for (let x of this.rowData) {
      if(x.ItemID == 0){

        this.item = {
          "InvoiceID":x.InvoiceID,
          "Quantity": x.Quantity,
          "Product": {"ProductName":x.Product,"Price":x.Price}
         }
         this.service.PostItem(this.item);
      }
      else{
        this.item = {
          "ItemID":x.ItemID,
          "ProductID":x.ProductID,
          "InvoiceID":x.InvoiceID,
          "Quantity": x.Quantity,
          "Product": {"ProductName":x.Product,"Price":x.Price}
         }
         this.service.PutItem(this.item);
      }
  }
} 

  onSubmit(f: NgForm){
    this.datasource.Price = 0;
    if(this.datasource.InvoiceID == null)
    {
      this.service.PostInvoice(this.datasource)//.then(res => this.onItemAdd());
    }
    else
    {this.service.PutInvoice(this.datasource);}

    this.datasource = {
      CustomerID:1,
      InvoiceID: null,
      ClientName: '',
      DueDate: '',
      Price: 0,
      //      
      Customer:{
        CustomerName: '',
        BirthDate: '',
        Phone:0,
        },
      //
     }
     //setTimeout(() => this.onItemAdd(),2000);
     //this.onItemAdd();
     this.rowData = [];
     this.Cost = 0;
     this.isCollapsed = true;

     this.Myflag = false;
  }

  //---------------grid
  private gridApi;
  private gridColumnApi

  onAddRow() {
    let newItem = this.createNewRowData();
    this.rowData.push(newItem);
    var res = this.gridApi.updateRowData({ add: [newItem] });
  }

  MycellValueChanged(){
    this.Cost=0;
    for (let x of this.rowData) {
      this.Cost = this.Cost + +x.Price;
     }
  }
   newCount = 1;
   createNewRowData() {
    var newData = {
      ItemID:0,
      ProductID:0,
      InvoiceID:this.datasource.InvoiceID,
      Product:'',
      Price: 0,
      Quantity: 0
    };
    this.newCount++;
    return newData;
   }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

}