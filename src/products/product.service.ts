import { Injectable } from "@nestjs/common";
import { ProductModule } from "./product.module";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductService {
    constructor(@InjectModel('product') private productModel: Model<ProductModule>) {}

    addProduct(product: any) {
        const newProduct = new this.productModel(product)
        return newProduct.save()
    }

    async getProduct(page: number, limit: number) {
        const startIndex = (page - 1) * limit
        const data = await this.productModel.find().skip(startIndex).limit(limit)
        const total = await this.productModel.countDocuments()
        return { data, total }
    }

    getProductById(id: string) {
        return this.productModel.findById(id)
    }

    deleteProduct(id: string) {
        return this.productModel.deleteOne({ _id: id })
    }

    async updateProduct(id: string, updatedProductData: object) {
        return await this.productModel.findByIdAndUpdate(id, updatedProductData)
    }

    async updateProduct1(id: string, updatedProductData: object) {
        return await this.productModel.findByIdAndUpdate(id, updatedProductData)
    }
}