import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Response } from "express";
import * as Joi from 'joi';
import { ObjectIdValidationPipe } from "../validator/objectid.validate";
import { FileValidation } from "../validator/file.validate";

const mongoIdSchema = Joi.string().length(24).hex(); // Schema cho _id của MongoDB
@Controller('/v1')
export class ProductController {
    constructor(private productService: ProductService, readonly fileValidation: FileValidation) {}

    @Get('all-product')
    async getAllProduct(
        @Res() res: Response,
        @Query('page') page: number = 1, 
        @Query('limit') limit: number = 5, 
    ) {
        try {
            const { data, total } = await this.productService.getProduct(page, limit)
            const totalPages = Math.ceil(total / limit)
            return res.json({
                status: 200,
                totalPages: totalPages,
                currentPage: page,
                data: data,
            });
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

    @Get('/product/:id')
    async deleteProduct(
        @Param('id', new ObjectIdValidationPipe(mongoIdSchema)) id: string,
        @Res() res: Response,
    ) {
        try {
            const findProduct = await this.productService.getProductById(id)
            if (!findProduct) {
                return res.json({
                    status: 400,
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            return res.json({
                status: 200,
                message: 'Đã tìm thấy sản phẩm',
                data: findProduct
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

    @Get('/product/:id')
    async deleteProduct1(
        @Param('id', new ObjectIdValidationPipe(mongoIdSchema)) id: string,
        @Res() res: Response,
    ) {
        try {
            const findProduct = await this.productService.getProductById(id)
            if (!findProduct) {
                return res.json({
                    status: 400,
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            return res.json({
                status: 200,
                message: 'Đã tìm thấy sản phẩm',
                data: findProduct
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

}