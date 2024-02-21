import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})

export class Product {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true
    })
    price_old: number;

    @Prop({
        required: false
    })
    price_discount: number;
       
    @Prop({
        required: true
    })
    quantity: number;

    @Prop({
        required: true,
        type: [String]
    })
    image: string[];

    @Prop({ 
        required: false 
    }) 
    description: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product)