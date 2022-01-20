const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('habil@gmail.com'));
// console.log(validator.isMobilePhone('081234637212','id-ID'));
// console.log(validator.isNumeric('081234637212'));

const pesan = chalk`hi saya {bgBlue.black habil},saya adalah seorang manusia`;
console.log(pesan);