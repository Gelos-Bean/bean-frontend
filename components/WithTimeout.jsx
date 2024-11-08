
export const withTimeout = (promise, timeoutMs) => {
  //Accepts props for a timeout for a request before going to the catch block
  return Promise.race([
      promise,
      new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timed out')), timeoutMs)
      ),
  ]);
};
