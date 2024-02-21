import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "../helpers/upload.file";
import { Response } from "express";

@Controller('/v1')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('/add-product')
    @UseInterceptors(FilesInterceptor('image', 10, {
        storage: storageConfig('image-product'),
        limits: {
            fileSize: 5 * 1024 * 1024,
        }
    }))
    async createProduct(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: any,
        @Res() res: Response
    ) {       
        try {
            if(!files) {
                return res.json({
                    status: 400,
                    message: 'Không có file được tải lên',
                })
            }
            const URL = process.env.URL
            if (files.length === 0 || !body.name || !body.price_old || !body.quantity) {
                return res.json({
                    status: 404,
                    message: 'Thiếu 1 trong các dữ liệu name, price_old, quantity',
                })
            }
            const image = files.map(file => {
                return `${URL}/image-product/${file.filename}`
            });
            const newProduct = await this.productService.addProduct({
                name: body.name,
                price_old: body.price_old,
                price_discount: body.price_discount || null,
                quantity: body.quantity,
                description: body.description || null,
                image: image
            })
            return res.json({
                status: 201,
                message: 'Thêm sản phẩm thành công',
                data: newProduct
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

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
        @Param('id') id: string,
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

    @Delete('/product/:id')
    async getProductbyId(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        try {
            const findProduct = await this.productService.getProductById(id)
            if (!findProduct) {
                return res.json({
                    status: 400,
                    message: 'Không tìm thấy sản phẩm'
                })
            } else {
                await this.productService.deleteProduct(id)
                return res.json({
                    status: 200,
                    message: 'Đã xoá sản phẩm thành công',
                })
            }     
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

    @Put('/update-product/:id')
    @UseInterceptors(FilesInterceptor('image', 10, {
        storage: storageConfig('image-product'),
        limits: {
            fileSize: 5 * 1024 * 1024,
        }
    }))
    async updateProduct(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() body: any,
        @Res() res: Response,
        @Param('id') id: string,
    ) {       
        try {
            const findProduct = await this.productService.getProductById(id)
            if (!findProduct) {
                return res.json({
                    status: 400,
                    message: 'Không tìm thấy sản phẩm'
                })
            } else {
                if(!files) {
                    return res.json({
                        status: 400,
                        message: 'Không có file được tải lên',
                    })
                }
                const URL = process.env.URL
                if (files.length === 0 || !body.name || !body.price_old || !body.quantity) {
                    return res.json({
                        status: 404,
                        message: 'Thiếu 1 trong các dữ liệu name, price_old, quantity',
                    })
                }
                const image = files.map(file => {
                    return `${URL}/image-product/${file.filename}`
                });
                const updateProduct = {
                    name: body.name,
                    price_old: body.price_old,
                    price_discount: body.price_discount || null,
                    quantity: body.quantity,
                    description: body.description || null,
                    image: image
                }
                await this.productService.updateProduct(id, updateProduct)
                return res.json({
                    status: 201,
                    message: 'Cập nhật sản phẩm thành công',
                    data: updateProduct
                })
            }
        } catch (error) {
            return res.json({
                status: 500,
                message: `Xảy ra lỗi ${error}`,
            })
        }
    }

}