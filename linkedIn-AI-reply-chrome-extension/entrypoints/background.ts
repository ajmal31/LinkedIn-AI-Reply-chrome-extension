export default defineBackground(() => {
  console.log("helo ajmal")
  // alert("helo started")
  // console.log("helo")
  console.log('Hello background!', { id: browser.runtime.id });
  
});
