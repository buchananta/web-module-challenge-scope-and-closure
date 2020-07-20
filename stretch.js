//I'm supposed to play with closures some. fun!

//lets make a self invoking counter, so I can just call counter() and increment something
const counter = (function(){
  let sum = 0;
  return () => sum++;
})();
//this should start at one, and count up by two.
while (counter() < 10) {console.log(counter());}

//can I make it invoking again, so everytime it's referenced like a variable it increments?
let count = counter();
console.log(count);
console.log(count);
//nope, just assigns the variable, of course, that'd be silly.
console.log(counter());

//how about something that counts up fibonnaci, and just adds more as requested?

function sum(a, b) {
  return a + b;
}

let fibb = (function() {
  let seq = [];
  return function(num) {
    if (num < 0) return [];
    if (seq.length < 1) { //initialization logic for fibbonacci sequence
      seq.push(0);
      num--;
    }
    if (seq.length < 2 && num) {
      seq.push(1);
      num--;
    }
    for(let i = 0; i < num; i++) { //main loop
      seq.push(sum(...seq.slice(-2)));
    }
    return seq.slice(-num);
  }
})();

console.log(fibb(1));
console.log(fibb(1)); //edge case here, where it will return 2 numbers because I decrement num, so it ends up returning seq.slice(0)
console.log(fibb(25));
console.log(fibb(7)); 
console.log(fibb(1));
//not gonna lie, that's pretty cool though

//lets multiply some numbers!
const mul4 = num1 => num2 => num3 => num4 => num1 * num2 * num3 * num4;
console.log(mul4(1)(2)(3)(4));