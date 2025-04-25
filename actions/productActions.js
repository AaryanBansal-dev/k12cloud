// app/actions/productActions.js
"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products));
}

export async function addProduct(formData) {
  await dbConnect();

  const productData = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price")),
    inStock: formData.get("inStock") === "true",
  };

  const product = await Product.create(productData);
  return JSON.parse(JSON.stringify(product));
}
