const shortid = require('shortid');

let users = [
    {
        id: shortid(),
        name: 'John Rossi',
        bio: 'Web Developer',
    },
    {
        id: shortid(),
        name: 'Rosita Morejon',
        bio: 'house wife',
    },
];

function getUsers() {
    return users;
};