
// // Create object constructor
// function Contact(firstName, lastName, birthday) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.birthday = birthday;
//     this.addresses = {};
//     this.phones = {};
//     this.emailAddresses = {};
// }

// function Address(addressType, line1, line2, city, province, postalCode, country) {
//     this.addressType = addressType; // possibilities: home, work, other
//     this.line1 = line1;
//     this.line2 = line2;
//     this.city = city;
//     this.province = province;
//     this.postalCode = postalCode;
//     this.country = country;
// }

// function Phone(phoneType, number, kind) {
//     this.phoneType = phoneType; // possibilities: home, work, other
//     this.kind = kind; // possibilities: landline, cell, fax
//     this.number = number;
// }

// function Email(emailType, email) {
//     this.emailType = emailType; // possibilities: home, work, other
//     this.email = email;
// }


// /////////
// var contact1 = new Contact("steve","cool", "February 30 1950");


"use strict"; var inquirer = require("inquirer"); 
    console.log("What would you like to do?");
    var questions = [
        {
            type: "input",
            name: "firstName",
            message: "Please enter the first name",
            validate: (function ( value ) {
                if (value ) {
                    return true;
                } else {
                    return "Please enter a first name";
                }
            })
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter the family name",
            validate: (function (value ) {
                if (value) {
                    return true;
                } else {
                    return "Please enter a family name";
                }
            })
        },
        {
            type: "input",
            name: "birthday",
            message: "Please enter the birthday",
            validate: (function (value) {
                if (value) {
                    return true;
                } else {
                    return "Please enter the date of birth";
                }
            })
        }
            
            
        ];
        
inquirer.prompt( questions, function( answers ) {
  console.log("\nOrder receipt:");
  console.log( JSON.stringify(answers, null, " ") );
});