using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApiDB.Models
{
    public class Product
    {
       public int? ProductID { get; set; }
       public string ProductName { get; set; }
       public int Price { get; set; }

        public List<Item> Items { get; set; }

        public Product()
        {
            Items = new List<Item>();
        }
    }
}
