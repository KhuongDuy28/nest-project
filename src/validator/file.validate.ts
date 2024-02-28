import { Injectable } from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class FileValidation {
  validateFile(file: any): boolean {
        // Define your Joi schema
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      birthyear: Joi.number().integer().min(1970).max(2013),
    });

    // Validate the file against the schema
    const result = schema.validate(file);

    // If there are validation errors, handle them
    if (result.error) {
      console.error('Validation error:', result.error);
      return false;
    }

    // If validation passes, return true
    return true;
  }
}
