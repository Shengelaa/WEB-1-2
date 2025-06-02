"use strict";
let userName = "giorgi";
let age = 20;
let isSmoker = false;
console.log(userName);
function sum(a, b, isAbs) {
    return isAbs ? Math.abs(a + b) : a - b;
}
function sub({ num1, num2 }) { }
sub({ num1: 10, num2: 20 });
const result = sum(20, 20);
console.log(result);
const res2 = sum(-20, -50, true);
console.log(res2);
const nums = [1, 2, 3];
const nums2 = [1, 2, 3, "gela"];
console.log(nums2);
function log(msg) {
    console.log(msg);
}
log(nums2);
function changeUserName(user) { }
function renderBtn(size) {
    if (size === "sm") {
        console.log("size is small");
    }
    else if ((size = "md")) {
        console.log("size is medium");
    }
    else {
        console.log("size is large");
    }
}
renderBtn("sm");
class Student {
    constructor(name, age, grade, fee) {
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
    constructor(name, age, grade, fee) {
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
