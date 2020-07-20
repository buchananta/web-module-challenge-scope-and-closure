// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/
function processFirstItem(stringList, callback) {
  return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *    counter1 is a closure, keeping count hidden inside the function scope. counter2 is not, creating the variable count globally.
 * 2. Which of the two uses a closure? How can you tell?
 *    counter1, it returns a newly defined function
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *     counter1 would be better bey default I believe, as it protects a variable only it needs access to. counter2 would be better if you have other things that need to access or alter the count variable
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}


/* Task 2: inning() 

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning(){
  return Math.floor(Math.random() * 3)
}

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore(callback, innings){
  const result = {"Home": 0, "Away": 0,};
  while (innings--) { //will blow up if given a negative number
    result.Home += callback();
    result.Away += callback();
  }
  return result;
}
console.log(finalScore(inning, 9));
/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */

//okay, I need to make a function that acts line finalScore, but just adds to the object each time Called. So a closure, that has the "finalScore" as a scoped variable, and increments them each call.

//hmm... everytime I call it, rather than make a new object, it references the same one over and over. Which is what I wanted. But the array does this as well.. why didn't I see this coming?
function getInningScoreBad(){
  const result = {"Home": 0, "Away": 0,};
  return function(callback) {
    result.Home += callback();
    result.Away += callback();
    return result;
  }
}
//this works, because it creates a new object every time it's called. yay!
function getInningScore(){
  let homeScore = 0;
  let awayScore = 0;
  return function(callback) {
    homeScore += callback();
    awayScore += callback();
    return {"Home": homeScore, "Away": awayScore};
  }
}
//self-invoking version, neat!
const getInningScoreInvoked = (function(){
    let homeScore = 0;
    let awayScore = 0;
    return function(callback) {
      homeScore += callback();
      awayScore += callback();
      return {"Home": homeScore, "Away": awayScore};
    }
  })();


function scoreboard(getInningScore, inning, numInnings) {
  const scoreResult = [];
  const increment = getInningScore();
  for(let i = 0; i < numInnings; i++){
    scoreResult.push(increment(inning));
  }
  return scoreResult;
}

console.log(scoreboard(getInningScore, inning, 9));
