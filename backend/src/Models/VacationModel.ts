import Joi from 'Joi';

// import BaseJoi from 'joi';
import JoiDate from '@Joi/date';
const dateJoi = Joi.extend(JoiDate);

import { ValidationError } from './ErrorModels';

export type VacationType = {
    id: number;
    destination:string;
    description:string;
    start_date: string;
    end_date: string;
    price: number;
    image:any;

}

export const vacationValidationSchema = Joi.object({
    id: Joi.number().optional().positive().integer(), 
    destination: Joi.string().required().min(2).max(200),
    description: Joi.string().required().min(2).max(10000),
    start_date: dateJoi.date().format('YYYY-MM-DD').required(),
    end_date: dateJoi.date().format('YYYY-MM-DD').greater(Joi.ref('start_date')).required(),
    price: Joi.number().less(10001).min(1).required(),
    image: Joi.string().required().min(2),
})


export const validateVacation = (vacation: VacationType): void => {
    const result = vacationValidationSchema.validate(vacation);
    if(result.error) ValidationError(result.error.message);
}