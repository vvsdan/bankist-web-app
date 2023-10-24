'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
//Simulating as if data comes from an API, otherwise map may be superior
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// /Functions
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDate[i]);
    const day = `{date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear;
    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

//Event Handler
//Defined outside of the function so it is accessible later
let currentAccount;

//FAKE ALWAYS LOGGINED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// Want day/month/year

btnLogin.addEventListener('click', function (e) {
  //prevents form from submitting/refreshing
  e.preventDefault();
  console.log('LOGIN');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

////*****REQUESTING A LOAN */
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);
    //UpdateUI
    updateUI(currentAccount);
  }
});

////**** DELETE ACCOUNT */

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount?.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //delete account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
console.log(arr.slice(2)); //This will extract from c to the end and output a new array
//This is a copy of the array, does not mutate
console.log(arr.slice(2, 4)); //Can also specify and end parameter (end is not included in the output)
//Length is end parameter minus the beginning = 2 values
console.log(arr.slice(-2)); //This will start from the end and take the last two elements
console.log(arr.slice(1, -2)); //Starts at 1 and excludes last 2
console.log(arr.slice()); //Can call without arguments to create a copy
console.log([...arr]); //This is the same as the above, based on preference

//SPLICE
//This will mutate the original array
// console.log(arr.splice(2)); //This would delete the last 3 from the original array
arr.splice(-1); //Common use case to remove the last element from an array
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //This reverses the order of an array and DOES mutate the array
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2); //Combines two arrays
console.log(letters);
console.log(...arr, ...arr2); //Same thing as concat, neither mutate originals

//JOIN
console.log(letters.join(' - ')); //Can specify a separator for arrays

//143. The New At Method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0)); //This is the newer notation
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]); //Easier alternative than above to get the last element in the array
console.log(arr3.at(-1)); //Even EASIER method using a method

//Bonus: .at method also works on strings
console.log('Jones'.at(0)); //This returns J

//144. Looping Arrays: forEach
//Using the movements array from above
//Positives are deposits, negatives are withdrawals
// Example of for/of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement #${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement #${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
//Example of for/Each loop
//Loops over the array and executes the
console.log(`----DIVIDER----`);
movements.forEach(function (movement, i, arr) {
  //Order of the arguments matter! current element -> index -> curret array element
  if (movement > 0) {
    console.log(`Movement #${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement #${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
//0: function(200)
//1: function(450)
//2: function(400)
//... passes in each element one at a time
//You canNOT break out of a forEach, it will always loop over the entire array
//Have to use for of if you need to break out

//146. forEach with maps and sets
//Map
currencies.forEach(function (value, key, map) {
  //similar to arrays base on order
  console.log(`${key}: ${value}`);
});
//Set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${key}: ${value}`);
// }); // key is the same as the value because sets do not have keys
//Keeps same parameters, just set the second one to the first one

//149. Data Transformations with map, filter, and reduce
//Map is similar to forEach, it can be used for looping but can apply a callback function
//Map can for instance, take an array, multiple each value by 2, then put those new values in a new array
//Filter will only include elements that pass test condition
//Reduce will simply into one single value (i.e., add up all numbers in an array)
//Reduce does not give a new array, only the reduced value

//Converting Euro to USD by use of Map data transformation
const eurToUSD = 1.1; //We want to multiply each value by 1.1

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });

const movementsUSD = movements.map(mov => mov * eurToUSD); //same as above which is commented but cleaner

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUSD);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//accumulator -> SNOWBALL
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

//Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//Find will return the first element in an array that meets the criteria
//Filter returns an array, find will only return a value
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
