// Load dependencies
var inquirer = require("inquirer");


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
    this.kind = kind;           // possibilities: landline, cell, fax
    this.number = number;
}

function Email(email) {
    this.email = email;
}



// Gather the data and Populate the contact
var contact = new Contact();
contact.addresses.home = new Address();
contact.addresses.work = new Address();
contact.addresses.other = new Address();
contact.phones.home = new Phone();
contact.phones.work = new Phone();
contact.phones.other = new Phone();
contact.emailAddresses.home = new Email();
contact.emailAddresses.work = new Email();
contact.emailAddresses.other = new Email();
// Push Contact into addressBook
addressBook.push(contact);

//////////////////////////
console.log (addressBook);