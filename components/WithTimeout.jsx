
export const withTimeout = (promise, timeoutMs) => {
  //Accepts props for a timeout for a request before going to the catch block
  timeoutMs = 10000 //Override input to set timeout to 10 secds
  return Promise.race([
      promise,
      new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
      ),
  ]);
};
