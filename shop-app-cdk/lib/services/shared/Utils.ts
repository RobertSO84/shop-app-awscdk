import { randomUUID } from "crypto"; //This is a native NodeJS function
import { JsonError } from "./Validator";


// esta función se creó para identificar librerias externas más facilmente y darle mantenimiento si esta es deprecada.
export function createRandomId(){
    return randomUUID();
}

export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg)
        
    } catch (error) {
        throw new JsonError(error.message);
        
    }
}