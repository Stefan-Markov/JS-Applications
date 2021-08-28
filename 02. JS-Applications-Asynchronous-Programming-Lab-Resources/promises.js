let guestCount = 99;

let engagementPromise = new Promise(function (resolve, reject) {
    if (guestCount > 100) {
        setTimeout(function () {
            reject('Wedding too big');
        }, 1000);
    } else {
        setTimeout(function () {
           resolve('Let\'s get marry');
        }, 4000);
    }
});

engagementPromise
    .then(function (message) {
        console.log('promise fufilled');
        console.log(message);
    })
    .catch(function (reason) {
        console.log('promise rejected');
        console.log(reason);
    });

console.log('preparations');

// let alwaysReject = Promise.reject('Some reasone');
let alwaysResolve = Promise.resolve('Agree');

// alwaysReject.catch()
// alwaysResolve.then()

let allPromises = Promise.all([
    engagementPromise,
    alwaysResolve,
]);

allPromises
    .then(function(response) {
        console.log('All resolved');
    })
    .catch(function(err) {
        console.log('at least one failed');
    })
    .finally(function() {
        console.log('at the end');
    })
