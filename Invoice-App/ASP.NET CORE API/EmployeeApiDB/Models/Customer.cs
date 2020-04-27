using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApiDB.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string CustomerName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Phone { get; set; }
        public List<Invoice> Invoices { get; set; }

        public Customer()
        {
            Invoices = new List<Invoice>();
        }
    }
}
