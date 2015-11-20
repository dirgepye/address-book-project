var inquirer = require("inquirer");

var addressCheckBox = [{
    type: "checkbox",
    name: "checkbox",
    message: "pick one",
    choices: [
        {name: "don't do it"},
        {name: "not this one either!"},
        {name: "this one!"}]
}]

inquirer.prompt(addressCheckBox, function(menuChoice) {
    console.log(menuChoice);
    if (menuChoice.main === "don't do it") {
        console.log("you idiot!")
    }
    else if (menuChoice.main === "not this one either!") {
        console.log("don't you know how to read?")
    }
    else {
        return
    }
});