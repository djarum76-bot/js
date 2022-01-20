let condition = true;
let tesAsyncAwait = async (condition) => {
  if (condition) {
    return "Condition is fulfilled!";
  } else {
    throw "Condition is rejected!";
  }
};

const run = async (condition) => {
    try {
      const message = await tesAsyncAwait(condition);
      console.log(message);  // Output: Condition is fulfilled!
      console.log("After condition is fulfilled"); // Output: After condition is fulfilled
    } catch (error) {
      console.log(error);
    }
  };
  
  run(true);