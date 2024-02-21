import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestProduct')
    ]
})

export class MongoConnection {}
