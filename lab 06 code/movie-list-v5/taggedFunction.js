let taggedFunction = function(array, name, age) {
    console.log(name);
    console.log(age);

    console.log(array);

    return 'Kvoto si iskame'
}

let firstName = 'Pesho';
let age = 20;

let result = taggedFunction`Lorem ipsum, ${firstName} dolor sit amet consectetur adipisicing elit. ${age} Quaerat, dolorem.`
console.log(result);