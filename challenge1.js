'use strict';

//TEST DATA
//1. Create new array from Julia's excluding first and last

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];

// const newJulia = Julia.slice(1, 4);

// const both = [...newJulia, ...Kate];

// both.forEach(function (age, i, arr) {
//   if (age > 3) {
//     console.log(`Dog number ${i + 1} is an adult`);
//   } else {
//     console.log(`Dog number ${i + 1} is a puppy`);
//   }
// });

// console.log(both);

const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAges);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
