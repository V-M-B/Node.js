// console.log(add(1,2)); //error bcuz add  "module" is not defined 

// const math=require('module-name')  ** syntax **

const math=require('./math')
// const {add, sub} = require('./math')  ** De-structure  **

console.log(math.add(2,3));


//  using exports function
const mul=require('./exportFunction')

console.log(mul(9,9));
