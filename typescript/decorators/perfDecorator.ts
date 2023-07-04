import { performance } from "perf_hooks";
import "reflect-metadata";

const importantMetadataKey = Symbol("important");
 
export function important(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(importantMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata( importantMetadataKey, existingRequiredParameters, target, propertyKey);
}

//This decorator like all class decorators accepts the constructor of the class it is decorating
//Not that this would give you acceess to instances of the class (so constructor here is referring to the 
//object created from this class as such all object properties and methods are available for use)
//Here we are just returning a class that extends the constructor that was passed in
//Also we are adding a __timings property and a printTimings method
export function logTimings<T extends { new (...args: any[]): {} }>(
    constructor: T
    ) {
    return class extends constructor {
        __timings = [];
        printTimings = () => {
            console.log(this.__timings)
        }
    };
  }


interface ThisWithTimings {__timings: unknown[]}
// This is a decorator factory function which returns the decorator function itself which is recommended 
// the target argument is the class thats calling the function (ie; its scope)
// the propertyKey argument is the name of the function we are decorating
export function timing(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const value = descriptor.value;
        let val = target[propertyKey];
        const getter = () => {
            return value
        }
        const setter = (next: string) => {
            console.log('... running Setter: ' + next)
            val = `🤦‍♂️ ${next}`
        }
        descriptor.value = async function(...args: any[]){
            const start = performance.now();
            const out = await value.apply(this, args);
            const end = performance.now();
            
            const importantParams: unknown[] = [];
            let importantParameters: number[] = Reflect.getOwnMetadata(importantMetadataKey, target, propertyKey);
            if (importantParameters) {
                for (let parameterIndex of importantParameters) {
                    importantParams.push(args[parameterIndex]);
                }
            }
            
            if((this as ThisWithTimings).__timings){
                (this as ThisWithTimings).__timings.push({
                    method: propertyKey,
                    time: end - start,
                    importantParams
                })
            }else{
                console.log(end - start)
            }
            Object.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            })
            return {out, val}
        }
    }
}