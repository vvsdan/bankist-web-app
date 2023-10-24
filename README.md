# Bankist Web Application

The Bankist web application is a working application that allows users to sign into their accounts via username and 4 digit bank pin. 

The application allows users to see any deposit/withdraw history, transfer money to ther users, or request a loan in a matter of seconds. 

The Bankist *website* repo can be viewed [here](https://github.com/vvsdan/bankist) 
## Preview

![Bankist Web Application](https://dj-project-previews.s3.amazonaws.com/js-projects/bankist.png)
## Live Project

This project is hosted on Netlify, please click [here](https://amazing-meerkat-fc8b5c.netlify.app) to view
## How To Use Bankist

### Logging in

Upon opening Bankist, there is a login field on the top right corner. 

#### Accessible accounts are listed below

Account #1 Jonas: 
- Username: js
- Password: 1111 
- Default currency: Euro

Account #2 Jessica: 
- Username: jd
- Password: 2222
- Default currency: USD 

Account #3 Steven
- Username: stw
- Password: 3333 
- Default currency: USD 

Account #4 Sarah:
- Username: ss
- Password: 4444 
- Default currency: USD 

### Default view 
Upon logging in, you are greeted with the name of the user's account along with the locale time, date, balance, and transaction history. 

#### Transferring money 
To transfer money from one user to another, enter the initials of desired user and the amount to send. For instance, if you are logged into user Jonas and want to send money to Jessica type "jd" in the "Transfer To" field, followed by the amount and click the arrow. 
To see money transferred, log into the opposite account and view deposit history underneath current balance. Balance is then updated for both users. 

#### Requesting loan
To request a loan, enter the desired amount into the "Request loan" field and click the arrow. After a brief delay, the desired amount is added to the depost-withdraw history and the current balance is updated. 

#### Logout Timer 
After 5 minutes elapses (timer seen below "Close account"), the user is logged out of their session and must provide login credentials again.

#### Close account 
To close the account, enter the same login credentials into their respective fields under "Close account". Once an account is closed, logging in is no longer available for the user. 

### Restarting the application

Data is not kept in local storage, to reset the application simply refresh the page and balances, transfers, loans, and closed accounts should revert to initial state. 
## About The Project
This is a vanilla Javascript project that strongly focuses on manipulating arrays. 

This project utilizes some of the following: 
- Simple authentication
- Array manipulation 
- Date/Time formating based on locale
- Currency formating
- Logout timer 
- Minimalistic approach
- ... and more 

### Moving Foward
There are currently bugs to be resolved during my testing. 
-  Account deposit withdraw history is lost upon trying to sort history. 
-  Upon closing the user's account the "Welcome back, {user}" remains. 
- Currency conversion between users using Euro-USD
## Acknowledgements

This project was completed as part of [Jonas Schmedtmann's](https://github.com/jonasschmedtmann) Javascript course. 
