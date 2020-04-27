export class Invoice {
      InvoiceID: number;
      CustomerID:number;
      ClientName: string;
      //
      Customer:{
      CustomerName: string;
      BirthDate: string;
      Phone:number;
      }
      //
      DueDate: string;
      Price: number;
      constructor(InvoiceID: number,ClientName: string,DueDate: string,Price: number) { 
            this.InvoiceID = InvoiceID;
            this.ClientName = ClientName;
            this.DueDate = DueDate;
            this.Price = Price;
      }
}
