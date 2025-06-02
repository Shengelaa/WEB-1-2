let userName: string = "giorgi";

let age: number = 20;

let isSmoker: boolean = false;

console.log(userName);

function sum(a: number, b: number, isAbs?: boolean): number {
  return isAbs ? Math.abs(a + b) : a - b;
}

function sub({ num1, num2 }: { num1?: number; num2?: number }) {}

sub({ num1: 10, num2: 20 });

const result = sum(20, 20);

console.log(result);

const res2 = sum(-20, -50, true);
console.log(res2);

const nums: number[] = [1, 2, 3];
const nums2: (number | string)[] = [1, 2, 3, "gela"];
console.log(nums2);

function log(msg: any) {
  console.log(msg);
}

log(nums2);
interface IAddress {
  home: string;
  work: string;
}
interface IUser {
  name: string;
  age: number;
  isSmoker: boolean;
  address: IAddress;
}

interface IStudent extends IUser {
  grade: number;
}

type UserType = {
  name: string;
  age: number;
  isSmoker: boolean;
};

type BtnVariantType = "sm" | "md" | "lg";

function changeUserName(user: IUser) {}

function renderBtn(size: BtnVariantType) {
  if (size === "sm") {
    console.log("size is small");
  } else if ((size = "md")) {
    console.log("size is medium");
  } else {
    console.log("size is large");
  }
}

renderBtn("sm");

class Student {
  public name;
  private age;
  protected grade;
  readonly fee;
  constructor(name: string, age: number, grade: number, fee: number) {
    this.name = name;
    this.age = age;
    this.grade = grade;
    this.fee = fee;
  }

  sayHello() {
    console.log("hello " + this.name);
  }
}
class ChildStudent extends Student {
  constructor(name: string, age: number, grade: number, fee: number) {
    super(name, age, grade, fee);
  }
  getGrade() {
    this.grade = -10;
  }
}
const child1 = new ChildStudent("ra", 11, 12, 15);

const student1 = new Student("giorgi", 27, 75, 15);
student1.name = "mamuka";
student1.sayHello();

type UserType = {
    id: number;
    name: string;
}
const user = [
    {
        id: 1,
        name: "giorgi"
    }
]

function getUsers(): Promise<UserType[]>{
    return new Promise((res, rej) => {
   V       setTimeout(() => {
            res(user)
        }, 2000)
    })
}



function getFirstElement<T>(arr: T[]): T{
    return arr[0]
}

getFirstElement<string | number>(['a', 'b', 'c'])

interface Foo{
    name: string
    age: number
}

function getNames<T extends {name: string}>(arr: T[]){
    return arr.map(el => el.name)
}

getNames([{name: 'rame', age:1}])


function getProps<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(el => el[key]);
}

getProps([{ name: 'rame', age: 1 }], 'name');
-+