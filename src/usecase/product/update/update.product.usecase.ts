
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";
export default class UpdateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const product = await this.ProductRepository.find(input.id);
    const product1 = new Product(product.id,product.name, product.price);
    product1.changeName("Product 1 updated");
    product1.changePrice(10);
    
    await this.ProductRepository.update(product1);

    return {
      id: product1.id,
      name: product1.name,
      price: product1.price,
    };
  }
}
