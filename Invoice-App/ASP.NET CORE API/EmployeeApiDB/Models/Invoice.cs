using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApiDB.Models
{
    public class Invoice
    {
        public int? InvoiceID { get; set; }
        public int CustomerID { get; set; }
        public string ClientName { get; set; }
        public string DueDate { get; set; }
        public int Price { get; set; }
        public Customer Customer { get; set; }
        public List<Item> Items { get; set; }

        public Invoice()
        {
            Items = new List<Item>();
        }
    }
}