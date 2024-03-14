import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.schema";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { FileValidation } from "../validator/file.validate";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'product',
            schema: ProductSchema
        }])
    ],
    providers: [
        ProductService,
        FileValidation
    ], 
    controllers: [
        ProductController
    ]
})

export class ProductModule {}