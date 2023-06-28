import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    // @Body() completeBody: {
    //     title: string;
    //     description: string;
    //     price: number;
    // }
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    const newProdId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return {
      newProdId,
    };
  }

  @Get()
  getAllProducts(): { products: Product[] } {
    return { products: this.productsService.getProducts() };
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(id, prodTitle, prodDesc, prodPrice);
    return {
      message: 'Product updated',
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
    return {
      message: 'Product deleted',
    };
  }
}
