// Name: Akshay Mathew
// Course: INFT 2202
// Date: 2025-02-15
// Description: This is a page for my shop.

// src/client/app/products/product.js
function Product(name, description, stock, price) {
    this.id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
}

export default Product;