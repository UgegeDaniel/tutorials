import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProductById(id: string): Product {
    const product = this.findProduct(id);
    return { ...product };
  }

  updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ): void {
    this.findProduct(id);
    if (!title || !description || !price) {
      throw new NotFoundException('Incomplete Information');
    }
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, title, description, price };
      }
      return product;
    });
  }

  deleteProduct(id: string): void {
    this.findProduct(id);
    this.products = this.products.filter((product) => product.id !== id);
  }
}
