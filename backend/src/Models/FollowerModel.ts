import Joi from 'Joi';

// import BaseJoi from 'joi';
import JoiDate from '@Joi/date';
const dateJoi = Joi.extend(JoiDate);

import { ValidationError } from './ErrorModels';

export type FollowerType = {
    user_id: number;
    vacation_id: number;
}

export const FollowerValidationSchema = Joi.object({
    user_id: Joi.number().optional().positive().integer(), 
    vacation_id: Joi.number().optional().positive().integer(), 
})


export const validateFollower = (vacation: FollowerType): void => {
    const result = FollowerValidationSchema.validate(vacation);
    if(result.error) ValidationError(result.error.message);
}