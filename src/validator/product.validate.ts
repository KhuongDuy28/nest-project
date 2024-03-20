import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class ProductJoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {  
      const { error } = this.schema.validate(value);
      if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
    }  
    return value
  }
}
