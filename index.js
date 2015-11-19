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
    this.addressType = addressType; // possibilities: home, work, other
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.province = province;
    this.postalCode = postalCode;
    this.country = country;
}

function Phone(phoneType, number, kind) {
    this.phoneType = phoneType; // possibilities: home, work, other
    this.kind = kind; // possibilities: landline, cell, fax
    this.number = number;
}

function Email(emailType, email) {
    this.emailType = emailType; // possibilities: home, work, other
    this.email = email;
}