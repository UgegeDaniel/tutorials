//Annotations
const hello : string ='world';
const age : number = 26;
const isSingle : boolean = true;
const myList : string[] = ["hello", "world"]
const anotherWay : Array<number> = [1,2,3]
//without annotations typescript will infere the type. Type inference should be used over annotations.

//Union types
const coulbBe : string | number = 5;
const mixedArray : (string | number)[] = [1, "a"];
const anotherMixArray : Array<number|string> = [1, "b"];
let seatAllotment : "aisle" | "middle" | "window" = "middle";
// seatAllotment = "crew" //NOT ALLOWED

//Tuples
let myStrictArray : [string, number, boolean] = ["1", 1, true]
//the order in which the types were denoted is to be adhered to though push, pop etc spoil this approach

//Generics 
const fxnGen = <T>(val: T):T =>{
//This function will take an argument of any data type and return only that data type 
//Putting a comma after the T and nothing after doesn't mean shit.
  return val;
}
interface AnInterface {
    first: number;
}
function fxnGen2<T extends number, U extends AnInterface>(val1: T, val2: U):number{
  const val3 = val1 + val2.first;
  return val3;
}

class GenClass<T> {
//we don't know the type that is going to be sent but when it is sent only that type can be ored in the cart.
  public cart: T[] = [];
  addToCart(product: T){
    this.cart.push(product)
  }
}

//Type Casting 
type Fish = {swim: ()=>void};
type Bird = {fly: ()=>void};
function isFish(pet: Fish | Bird): pet is Fish{
//if the argument we pass into this function has a swim method the argument (pet) is a fish 
  return (pet as Fish).swim !== undefined;
}

const fxn1 = (num : number)=>{
  return num + 2;
}
const fxn2 = (num: number, name: string = 'Daniel') : string =>{
  return `${name} is ${num} years`
}
//if function has no return or returns void, STATE IT
const fxn3 = (num: number): void =>{
  console.log(num);
  return
}
//when throwing errors use the return type of never
const fxn4 = (error: string): never =>{
  throw new Error(error);
}

type fxn5bParamType = {name: string, age: number} 
const fxn5b = (params: fxn5bParamType):fxn5bParamType => {
  return {...params}
}
type id = number | string;
const fxn6 = (id: number | string) : id =>{
  //to be able to use data-type specific methods on ids, you have to use an if statement 
  if(typeof id === "string"){
    return id.toUpperCase()
  }
  return id + 1;
}

//Aliases
//type 
type Fxn5Params = {
  name: string;
  age: number;
}

type fxn5Out = {
  name: string;
  age: number;
}

//fxn5 becomes 
const fxn5 = (user: Fxn5Params) : fxn5Out =>{
  return {name: user.name, age: user.age}
}

type type1 = {
  isStudent: boolean;
}

type type2 = {
  readonly _id: string; //the value for this can only ve assigned once and never re-assigned
  name: string;
  age: number;
  isSingle: boolean;
  gender?: string; //this value can be null
}

type type3 = type2 & type1 & {
  cardNumber: number;
}

//Interfaces (same as types only that we have methods here)
//Objects are created following an interface
//Classes implement interfaces then objects are instantiated from the classes

interface User {
  readonly dbId: number,
  name: string,
  googleId?: string,
  start(): string,
  end(id: string): void,
  githubId: string,
}

//We can "re-open" an interface (add fields to it)
interface User  {
}

//or we can just "inherit" it
interface Admin extends User {
  role: "manager" | "scrum master"
}

// const newUser : Admin = {
//   dbId: 432,
//   name: "Daniel",
//   githubId: "uge34",
//   role: "scrum master",
//   start: ()=>{
//     return "started";
//   },
//   end: ("id34")=>{
//     return
//   },
// }

class SuperClass {
    constructor(public name: string, public email: string){
    }
}

//Classes 
class UserClass extends SuperClass{
//Access Modifiers
  public name : string;
  public email: string;
  //accessible outside the class
  readonly city: string = "Jos";
  //accessible outside but unchangeable 
  private container : string = "wtf"
  //inaccessible outside the class also inaccessible to classes that extends this class
  protected userId: string | number;
  //accessible to classes that extends this class
  
  //You can and should write the above code as the parameter for the constructor without anything the body. (THE TYPESCRIPT WAY)

  constructor(name: string, email: string){
    super(name, email) //add this if this class extended from another class where name and email are properties from that extended class.
    this.email = email;
    this.name = name;
    
  }
  //You can also have access modifiers for methods to but setters can not have any annotations but getters can.
}
const user = new UserClass("Daniel", "d@d.com")


//INTERFACES EXTEND EACH OTHER JUST LIKE CLASSES EXTEND EACH OTHER BUT CLASSES IMPLEMENT INTERFACES 
// class Student implements User {
//   constructor(
//     public name: string,
//     public googleId: string
//   ){
//   }
//   start: ()=>{
//     return "started"
//   },
//   end: ("id34")=>{
//     return
//   },
// }

// abstract class Prefect {
//   constructor(){
//   }
//   abstract flog(): number{
  
//   }
// }

//Abstract classes cannot be used to instantiate objects but can be extended. Abstract methods are compulsory to classes that extended from their class and do not need type definition.

//Enums (Enumeration)
const enum Enum1 {
  FIRST,
  SECOND,
  THIRD,
  FOURTH = "FOURTH"
}

const val1 = 1;
const val2 = val1 + Enum1.SECOND;
//the value of Enum1.SECOND is Enum1.FIRST + 1 which is its index in the enumeration except you assign a value to it. If you give a number value to Enum1.FIRST it increaments down for the rest.

export {} 
//use this line to be able to see errors as you code.

// MATT POCKOKOK    GENERICS
