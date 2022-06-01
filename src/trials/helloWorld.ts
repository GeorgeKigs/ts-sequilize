var message :string = "Hello world"
var numbers: number = 5
var numbers_int: number [] = [2,5,6,7,8]
var doubleInt:number[] = numbers_int.map(e=>e**2)


function add<T>(num1:T,num2:T){
    if(typeof num1 == "number" && typeof num2=="number"){
        return num1+num2;
    }else{
        return "String";
    }
    
}

console.log(add<number>(2,5))

var arrays :string [] = ["new","definition"]

type obj_definition = {
    name:string,
    age:number,
    members:(string|number)[]
} 
var definition:obj_definition={
    name:`this is ${message} true`,
    age: numbers,
    members:[message,numbers]
}

function read_def(person:obj_definition):any {
    console.log(person.name,person.age)
}

console.log(message)
read_def(definition)
console.log(doubleInt)