// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
// function to validate each card number array
function validateCred(cardNum) {
    let digitSum = 0;

    // iterate through the card number array to calculate digit sum per algorithm
    // loop starts at 0 and increments to keep track of which digits get doubled
    // if loop counted down then algorithm would be different depending on the total number of card digits (even or odd)
    for (let i = 0; i < cardNum.length; i++) { 
    
        // decide if the current digit gets doubled
        if (i % 2 == 0) { // even iterations get added singly
            digitSum = digitSum + cardNum[cardNum.length - i - 1];
        } else { // odd iterations get added doubly
        
            // decide if 9 needs subtracted from doubled digit
            if (cardNum[cardNum.length - i - 1] <= 4) {
                digitSum = digitSum + (cardNum[cardNum.length - i - 1] * 2);
            } else { //if doubled value is >9 then subract 9 from doubled digit
                digitSum = digitSum + (cardNum[cardNum.length - i - 1] * 2 - 9);
            }
        }
    }

  if (digitSum % 10 == 0) {
        return true; // sum of digit calcs is divisible by 10 (card valid)
  } else {
        return false; // sum of digit calcs aren't divisible by 10 (card not valid)
  }
}

// function to return nested array of invalid cards
function findInvalidCards(nestedArray) {
    const invalidCards = [];

    // loop through nestedArray parameter
    for (const card of nestedArray) {
        
        // call validateCred function to see if card is invalid
        if (validateCred(card) == false) {
            invalidCards.push(card); // if invalid push to invalidCards array
        }
    }

    return invalidCards;
}

//function to list companies who issued invalid cards in nested array
//no duplicates in list
function idInvalidCardCompanies(nestedArray) {
    const cardCompanies = [];

    for (const card of nestedArray) { //iterate through cards
        let company = ''

        switch (card[0]) { //find company for each card
        case 3:
            company = 'Amex (American Express)';
            break;
        case 4:
            company = 'Visa';
            break;
        case 5:
            company = 'Mastercard';
            break;
        case 6:
            company = 'Discover';
            break;
        default:
            console.log('Company not found');
        }

        // if company is not already in array, add them
        if (cardCompanies.includes(company) == false) {
            cardCompanies.push(company);
        }
    }

    // return completed array of companies
    return cardCompanies;
}

// function to convert and check string credit card number
function validateStringCred(stringCard) {

    // convert string card number to array of numbers
    const arrayCard = Array.from(stringCard, Number);

    // use validateCred function to verify card number and return result
    return validateCred(arrayCard);
}

// function to repair incorrect check digit
function repairCheckDigit(cardNum) {
    let digitSum = 0;
    let checkDigit = 0;
    
    // replace check digit with 0 for calc purposes
    cardNum.pop();
    cardNum.push(0);

    // iterate through the card number array to calculate digit sum per algorithm
    // loop starts at 0 and increments to keep track of which digits get doubled
    // if loop counted down then algorithm would be different depending on the total number of card digits (even or odd)
    for (let i = 0; i < cardNum.length; i++) { 
        
        // decide if the current digit gets doubled
        if (i % 2 == 0) { //even iterations get added singly
            digitSum = digitSum + cardNum[cardNum.length - i - 1];
        } else { //odd iterations get added doubly
            
            // decide if 9 needs subtracted from doubled digit
            if (cardNum[cardNum.length - i - 1] <= 4) {
                digitSum = digitSum + (cardNum[cardNum.length - i - 1] * 2);
            } else { //if doubled value is >9 then subract 9 from doubled digit
                digitSum = digitSum + (cardNum[cardNum.length - i - 1] * 2 - 9);
            }
        }
    }

    checkDigit = (10 - (digitSum % 10)) % 10; // calculate correct check digit

    // replace check digit with correct number
    cardNum.pop();
    cardNum.push(checkDigit);

    return cardNum;
}

// calling functions for testing

// test all cards in batch array
console.log('\n\nTesting all cards in batch array')
for (const card of batch) { 
    if (validateCred(card) == true) {
        console.log(card.join('') + ' is valid');
    } else {
        console.log(card.join('') + ' is invalid');
    }
}


// display all invalid card nums
console.log('\n\nThese card numbers are invalid')
for (const card of findInvalidCards(batch)) {
    console.log(card.join(''));
}


// display card companies who issued bad cards
console.log("\n\nThese credit card companies issued bad card numbers:")
console.log(idInvalidCardCompanies(findInvalidCards(batch)).join(', '));

// check string card number
console.log('\n\nChecking string card number 1234123412341234: ' + validateStringCred('1234123412341234'));

// verify repair check digit function
console.log('\n\nThis card number is invalid:')
console.log(invalid2.join(''));
console.log('\nThis is the repaired card number:')
console.log(repairCheckDigit(invalid2).join(''));