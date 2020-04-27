using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApiDB.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext() : base() { }
        public ApiContext(DbContextOptions<ApiContext> options)
         : base(options)
        {
        }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(new Product { ProductID = 1, ProductName = "Laptop",Price = 50},
                new Product { ProductID = 2, ProductName = "Iphone", Price = 60 },
                new Product { ProductID = 3, ProductName = "Tablet ", Price = 77 },
                new Product { ProductID = 4, ProductName = "Camera", Price = 33 },
                new Product { ProductID = 5, ProductName = "Smart Watch", Price = 56 },
                new Product { ProductID = 6, ProductName = "Headphones", Price = 18 },
                new Product { ProductID = 7, ProductName = "XBOX", Price = 92 },
                new Product { ProductID = 8, ProductName = "PS4", Price = 47 });
        }


    }
}
