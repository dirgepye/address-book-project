// Load dependencies
var inquirer = require("inquirer");
var promises = require('promises');
var Table = require('cli-table');

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

// ----------------------------------------------------------------------------
// Inquirer Questionnaire to gather Contact Data

// MAIN MENU
var mainMenu = [{
    type: "list",
    name: "main",
    message: "What would you like to do?",
    choices: ["New Entry", "Find Existing Entry", "Exit Program"]
}];

// NAME & BIRTHDAY
var personQuestions = [{
    type: "input",
    name: "firstName",
    message: "First name:",
    validate: (function(value) {
        if (value) {
            return true;
        }
        else {
            return "First name:";
        }
    })
}, {
    type: "input",
    name: "lastName",
    message: "Family name:",
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
    message: "Birthday",
    validate: (function(value) {
        if (value) {
            return true;
        }
        else {
            return "Please enter the date of birth";
        }
    })
}];

// Menu for Contact Creation
var establishDataEntry = [{
    // ADRRESS TYPES QUERY
    type: "checkbox",
    name: "addressChoices",
    message: "Types of address to enter:",
    choices: [{
        name: "home"
    }, {
        name: "work"
    }, {
        name: "other"
    }]
}, {
    type: "checkbox",
    name: "telChoices",
    message: "Types of Phone Number to enter:",
    choices: [{
        name: "home"
    }, {
        name: "work"
    }, {
        name: "other"
    }]
}, {
    type: "checkbox",
    name: "emailChoices",
    message: "Types of Phone Number to enter:",
    choices: [{
        name: "home"
    }, {
        name: "work"
    }, {
        name: "other"
    }]
}];

// ADDRESSES
function createAddressEntry(type) {
    return [{
        type: "input",
        name: type + "line1",
        message: type + " Address line 1",
        validate: (function(value) {
            if (value) {
                return true;

            }
            else {
                return "Please enter an address"
            }
        })
    }, {
        type: "input",
        name: type + "line2",
        message: type + " Address line 2 (optional)"
    }, {
        type: "input",
        name: type + "city",
        message: type + " City",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter the city"
            }
        })
    }, {
        type: "input",
        name: type + "province",
        message: type + " Province:",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Province:"
            }
        })
    }, {
        type: "input",
        name: type + "postalCode",
        message: type + " Postal code:",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter the postal code";
            }
        })
    }];
}

// PHONE NUMBERS
function createPhoneEntry(type) {
    return [{
        type: "input",
        name: type + "phoneNumber",
        message: type + " Phone number:",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "Please enter the " + type + " phone numeber";
            }
        })
    }, {
        type: "input",
        name: type + "phoneType",
        message: type + "Phone Type",
    }]
}

// EMAIL ADDRESSES
function createEmailEntry(type) {
    return [{
        type: "input",
        name: type + "email",
        message: type + " email",
        validate: (function(value) {
            if (value) {
                return true;
            }
            else {
                return "please enter the " + type + " email address";
            }
        })
    }]
}

// ----------------------------------------------------------------------------
// CLI-TABLE Configuration


// ----------------------------------------------------------------------------
// Main Program
inquirer.prompt(mainMenu, function(menuChoice) {
    if (menuChoice.main === "New Entry") {
        inquirer.prompt(personQuestions, function(answers) {
            inquirer.prompt(establishDataEntry, function(choice) {

                // Build the questionnaire based on the previous answers
                var questionnaire = [];
                choice.addressChoices.forEach(function(choice) {
                    questionnaire = questionnaire.concat(createAddressEntry(choice));
                });
                choice.telChoices.forEach(function(choice) {
                    questionnaire = questionnaire.concat(createPhoneEntry(choice));
                });
                choice.emailChoices.forEach(function(choice) {
                    questionnaire = questionnaire.concat(createEmailEntry(choice));
                });

                // Ask the Questions
                inquirer.prompt(questionnaire, function(contactData) {

                    // Gather the data and Populate the contact
                    var contact = new Contact(answers.firstName,
                        answers.lastName, answers.birthday);
                    if (contactData.homeline1) {
                        contact.addresses.home =
                            new Address(contactData.homeline1,
                                contactData.homeline2,
                                contactData.homecity,
                                contactData.homeprovince,
                                contactData.homepostalCode, "Canada");
                    }
                    if (contactData.workline1) {
                        contact.addresses.work =
                            new Address(contactData.workline1,
                                contactData.workline2,
                                contactData.workcity,
                                contactData.workprovince,
                                contactData.workpostalCode, "Canada");
                    }
                    if (contactData.otherline1) {
                        contact.addresses.other =
                            new Address(contactData.otherline1,
                                contactData.otherline2,
                                contactData.othercity,
                                contactData.otherprovince,
                                contactData.otherpostalCode, "Canada");
                    }
                    if (contactData.homephoneNumber) {
                        contact.phones.home =
                            new Phone(contactData.homephoneType,
                                contactData.homephoneNumber);
                    }
                    if (contactData.workphoneNumber) {
                        contact.phones.work =
                            new Phone(contactData.workphoneType,
                                contactData.workphoneNumber);
                    }
                    if (contactData.otherphoneNumber) {
                        contact.phones.other =
                            new Phone(contactData.otherphoneType,
                                contactData.otherphoneNumber);
                    }
                    if (contactData.homeemail) {
                        contact.emailAddresses.home =
                            new Email(contactData.homeemail);
                    }
                    if (contactData.workemail) {
                        contact.emailAddresses.work =
                            new Email(contactData.workemail);
                    }
                    if (contactData.otheremail) {
                        contact.emailAddresses.other =
                            new Email(contactData.otheremail);
                    }

                    // Push Contact into addressBook
                    addressBook.push(contact);

                    // Display the New Contact in CLI-TABLE
                    var table = new Table({
                        chars: {
                            'top': '═',
                            'top-mid': '╤',
                            'top-left': '╔',
                            'top-right': '╗',
                            'bottom': '═',
                            'bottom-mid': '╧',
                            'bottom-left': '╚',
                            'bottom-right': '╝',
                            'left': '║',
                            'left-mid': '╟',
                            'mid': '─',
                            'mid-mid': '┼',
                            'right': '║',
                            'right-mid': '╢',
                            'middle': '│'
                        },
                        style: {
                            'padding-left': 3,
                            'padding-right': 3,
                            'padding-bottom': 4
                        },
                    });
                    // table is an Array, so you can `push`, `unshift`, `splice` and friends 
                    table.push({
                        "Name": addressBook[0].firstName + " " +
                            addressBook[0].lastName
                    });
                    if (addressBook[0].birthday) {
                        table.push({
                            "Date of birth": addressBook[0].birthday
                        });
                    }
                    if (addressBook[0].addresses.home.line1) {
                        table.push({
                            "Home Address": addressBook[0].addresses.home.line1 + "\n" +
                                addressBook[0].addresses.home.line2 + "\n" +
                                addressBook[0].addresses.home.city + ", " +
                                addressBook[0].addresses.home.province + "\n" +
                                addressBook[0].addresses.home.postalCode + ", " +
                                addressBook[0].addresses.home.country
                        });
                    }
                    console.log(table.toString());
                });
            });
        });
    }
    else if (menuChoice === "Find Existing Entry") {
        console.log("Sorry, this feature is not currently available");
    }
    else {
        return;
    }
});