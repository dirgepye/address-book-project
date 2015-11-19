// Load dependencies // "use strict"; 
var inquirer = require("inquirer");

// ----------------------------------------------------------------------------
// The array that will hold all of the contacts.
var addressBook = [];

// Create object constructor
function Contact(firstName, lastName, birthday) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.addresses = {};
    this.phones = {};
    this.emailAddresses = {};
}

function Address(line1, line2, city, province, postalCode, country) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.country = country;
}

function Phone(number, kind) {
    this.kind = kind; // possibilities: landline, cell, fax
    this.number = number;
}

function Email(email) {
    this.email = email;
}

// START-----------------------------------------------------------------------
// Inquirer Questionnaire to gather Contact Data

var personQuestions = [{
        type: "input",
        name: "firstName",
        message: "Please enter the first name:",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter a first name:";
            }
        })
    }, {
        type: "input",
        name: "lastName",
        message: "Please enter the family name:",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter a family name:";
            }
        })
    }, {
        type: "input",
        name: "birthday",
        message: "Please enter the birthday",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter the date of birth";
            }
        })
    }
];

// Inquirer Questionnaire to gather Contact Data
// END ------------------------------------------------------------------------


inquirer.prompt(personQuestions, function(answers) {
    
    // ------------------------------------------------------------------------
    // Gather the data and Populate the contact
    var contact = new Contact(answers.firstName, answers.lastName, answers.birthday);
    // contact.addresses.home = new Address();
    // contact.addresses.work = new Address();
    // contact.addresses.other = new Address();
    // contact.phones.home = new Phone();
    // contact.phones.work = new Phone();
    // contact.phones.other = new Phone();
    // contact.emailAddresses.home = new Email();
    // contact.emailAddresses.work = new Email();
    // contact.emailAddresses.other = new Email();

    // Push Contact into addressBook
    addressBook.push(contact);

    console.log(addressBook);
});
