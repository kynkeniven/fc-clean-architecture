import { Sequelize } from "sequelize-typescript";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";




describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new ListProductUseCase(productRepository);

    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 50);

    await productRepository.create(product2);


    const output = [
      {
      id: "1",
      name: "Product 1",
      price: 100
    },
    {
      id: "2",
      name: "Product 2",
      price: 50
    }
  ];

    const result = await useCase.execute({});

    expect(result.products).toEqual(output);
  });
});
