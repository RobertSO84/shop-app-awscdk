import { ProductEntry } from "../model/product.model" 

export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} expected`)
    }
}

export class JsonError extends Error {}

export function validateAsProductEntry(arg: any){
    if((arg as ProductEntry).id == undefined){
        throw new MissingFieldError('id')
    }
    if((arg as ProductEntry).title == undefined){
        throw new MissingFieldError('title')
    }
    if((arg as ProductEntry).description == undefined){
        throw new MissingFieldError('description')
    }
    if((arg as ProductEntry).price == undefined){
        throw new MissingFieldError('price')
    }

}