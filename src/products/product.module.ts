import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'product',
            schema: ProductSchema
        }])
    ],
    providers: [
        ProductService
    ], 
    controllers: [
        ProductController
    ]
})

export class ProductModule {}