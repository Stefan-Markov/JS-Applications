function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

console.log('hello');

setTimeout(function () {
   console.log('Middle Earth'); 
}, 1);

wait(2000);

console.log('End of the world');