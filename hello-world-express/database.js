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
function getUserById(id) {
    return users.find(user => user.id === id);
};


function createUser(data) {
    const payload = {
        id: shortid.generate(),
        ...data,
    };
    users.push(payload);
    return payload;
};

function updateUser(id, data) {
    const index = users.findIndex(user => user.id === id);
    users[index] = {
        ...users[index],
        ...data,
    };
    return users[index];
};

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}