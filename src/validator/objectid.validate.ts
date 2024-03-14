import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import Joi from "joi";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.StringSchema) {}
    transform(value: any) {
        const { error, value: validatedValue } = this.schema.validate(value)
        if (error) {
            throw new BadRequestException('Id không đúng định dạng Mongo');
        }
        return validatedValue;
    }
}

export class ObjectIdValidationPipe1 implements PipeTransform {
    constructor(private readonly schema: Joi.StringSchema) {}
    transform(value: any) {
        const { error, value: validatedValue } = this.schema.validate(value)
        if (error) {
            throw new BadRequestException('Id không đúng định dạng Mongo');
        }
        return validatedValue;
    }
}