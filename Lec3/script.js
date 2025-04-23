console.log(1);
console.log(2);
async function a() {
  for (let i = 0; i < 10033; i++) {}
}

console.log(3);

// function a() {
//   console.log(1);
//   b();
// }

// function b() {
//   console.log(2);
//   c();
// }

// function c() {
//   console.log(3);
// }

// a();

let firstName = "nika";

let firstName2 = firstName;

firstName2 = "giorgi";

const user = {
  name: "mamuka",
};

const user2 = user;

user2.name = "mari";

console.log(firstName);
console.log(user);

function a(callBack) {
  setTimeout(() => {
    console.log(1);
    callBack();
  }, 1000);
}

// a(B);

function B() {
  console.log(3);
}

const myPromise = new Promise((resolve, reject) => {
  const stats = true;
  if (stats) {
    resolve("success");
  } else {
    reject("error");
  }
});

myPromise.then((res) => console.log(res)).catch((er) => console.log(er));

// 163425

async function name() {
  try {
    const response = await myPromise;
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

console.log(1);

console.log(1);
console.log(2);
const myPromise1 = new Promise((resolve, reject) => {});
console.log(3);

//Tasks

function startCountdown(seconds) {
  let counter = seconds;

  const interval = setInterval(() => {
    console.log(counter);
    counter--;

    if (counter < 0) {
      clearInterval(interval);
      console.log("Ding!");
    }
  }, 1000);
}

startCountdown(5);

//write a function that takes a random number as an argment and logs the random number while the argument number and random number are equal

function startCountdown(seconds) {
  let number = seconds;
  const interval = setInterval(() => {
    const random = Math.floor(Math.random() * 11);
    console.log(number, random);
    if (seconds === random) {
      clearInterval(interval);
      console.log("Ding!");
    }
  }, 1000);
}

startCountdown(5);

