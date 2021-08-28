function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

function resolveAfter3Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved2');
        }, 3000);
    });
}


// resolveAfter2Seconds()
//     .then(result => {
//         console.log(result);
//     })

async function asyncFunc() {
    try {
        let result = await resolveAfter2Seconds();
        console.log(result);
        let result2 = await resolveAfter3Seconds(result);
        console.log(result2);
    } catch (error) {
        console.log(error);
    }

    return "Pesho";
}

// //demo code
// returnPromise()
//     .then(response1  => {
//         return newPromise(response1);
//     })
//     .then(respense2 => {
//         return newPromise2(response2);
//     })
//     .then(response3 => {
//         return newPromise3(reponse1, response2)
//     })


asyncFunc()
    .then(res => {
        console.log(res);
    })

