var rs = require('readline-sync');

var fNum1 = rs.question('1st Number: ');
var digit1 = parseInt(fNum1, 2);
var fNum2 = rs.question('2nd Number: ');
var digit2 = parseInt(fNum2, 2);
var action = rs.question('Enter the action{+,-,*,/,%,<<,>>,&,|,~}');

var result
// if (action == '+' || action == '-' || action == '*' || action == '/' || action == '%') {
//     result = digit1 + action + digit2
//     console.log(digit1, action, digit2, "=", result)
// } else {
//     result = fNum1 + action + fNum2
//     console.log(digit1, action, digit2, "=", result)
// }

result = digit1 + action + digit2
var result = eval(result);

console.log(digit1, action, digit2, "=", result)



console.log((+result).toString(2));
