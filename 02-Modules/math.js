// module 
// it need to be exported
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}// module.exports=add;

// module.exports=add; this approach will override the add function
// we can u js obj to return multiple modules
module.exports=
{
    // if we use this there is no return statement either we can use method1 or method2
    
    // method1
    add,
    sub,

   //or to give a seprate name
    // method2
   addfunction:add,
   subFunction:sub,
};



