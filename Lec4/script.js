const myPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 3000);
});

const myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

const myPromise3 = new Promise((resolve, reject) => {
  if (true) {
    setTimeout(() => {
      resolve(3);
    }, 3000);
  } else {
    reject("error");
  }
});

async function Main() {
  //   const res1 = await myPromise1;
  //   const res2 = await myPromise2;
  //   const res3 = await myPromise3;

  //   console.log(res1, "res1");
  //   console.log(res2, "res2");
  //   console.log(res3, "res3");

  const res11 = new Promise((res) =>
    setTimeout(() => {
      res(1);
    }, 3000)
  );
  const res12 = new Promise((res) =>
    setTimeout(() => {
      res(2);
    }, 1000)
  );
  const res13 = new Promise((res) =>
    setTimeout(() => {
      res(3);
    }, 4000)
  );

  const array = await Promise.all([res11, res12, res13]);

  const array1 = await Promise.allSettled([res11, res12, res13]);
  const [resp1, resp2, resp3] = await Promise.all([res11, res12, res13]);

  //race

  console.log(array1);

  console.log(array);
}

Main();

const sleep = (ms) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

async function main() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
    await sleep(2000);
  }
}

main();

const button = document.querySelector(".button");

button.addEventListener("click", async () => {
  const url = "https://catfact.ninja/fact";
  const resp = await fetch(url);
  const data = await resp.json();

  const container = document.querySelector(".container");
  const text = document.createElement("h1");
  text.textContent = data.fact;
  container.appendChild(text);
});

const button2 = document.querySelector(".button2");

button2.addEventListener("click", async () => {
  console.log("hello world");
  const input = document.querySelector(".input");
  const id = input.value;

  const url = `https://myfakeapi.com/api/cars/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  const text1 = document.createElement("h1");
  const text2 = document.createElement("h2");

  text1.textContent = data.Car.car;
  text2.textContent = data.Car.car_model;
  const container = document.querySelector(".container");
  container.appendChild(text1);
  container.appendChild(text2);
});

function debouncer(cb, ms) {
  let interval;
  return (...args) => {
    clearInterval(interval);
    interval = setTimeout(() => {
      cb(...args);
    }, ms);
  };
}

const input2 = document.querySelector("#searchBar");
const container = document.querySelector(".container");
input2.addEventListener(
  "input",
  debouncer(async (e) => {
    container.innerHTML = "Loading...";
    const resp = await fetch(
      `https://api.escuelajs.co/api/v1/products?title=${e.target.value}`
    );

    const data = await resp.json();
    console.log(data);

    container.innerHTML = data
      .map(
        (el) =>
          `
        <h3>${el.description}</h3>
        <p>${el.id}</p>`
      )
      .join("");
  }, 300)
);

const MAXTRYCOUNT = 5;
let tryCount = 0;

async function main() {
  try {
    const resp = await fetch("https://rame12312.com");
    const data = await resp.json();
    console.log(data);
  } catch (error) {
    while (tryCount < MAXTRYCOUNT) {
      tryCount++;
      main();
    }
    console.log(error);
  }
}

main();
