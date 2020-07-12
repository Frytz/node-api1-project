// const http = require('http');

const express = require('express');
const shortid = require('shortid');
const db = require('./database.js');
const cors = require('cors');
// const hostname =  '127.0.0.1';
const port = 5000;

// const server = http.createServer((req, res) => {
// res.statusCode = 200;
// res.setHeader("Content-Type", 'text/plain');
// res.end('Hello World, from Node.Js')
// });

const server = express();

server.use(express.json());
server.use(cors());

// let users = [
//         // {
//         //     id: shortid(),
//         //     name: 'John Rossi',
//         //     bio: 'Web Developer',
//         // },
//         // {
//         //     id: shortid(),
//         //     name: 'Rosita Morejon',
//         //     bio: 'house wife',
//         // },
// ];



server.get('/', (req, res) => {
   res.status(200).json({Message: 'My first api project'})

});

server.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({ message: "Need a user name and bio" })
    };

    let newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    });

    if (!newUser) {
        return res.status(500).json({ message: "There was an error while saving the user to the database" });
    } else {
        return res.status(201).json(newUser);
    }

});

server.get('/api/users', (req, res) => {

    const users = db.getUsers();

    if (!users) {
        return res.status(500).json({ message: "The users information could not be retrieved." });
    } else {
        return res.status(200).json(users);
    }
});


server.get ('/api/users/:id', (req, res) => {

    const user = db.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        return res.status(200).json(user);
    }
})

server.put('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user && req.body.name && req.body.bio) {
        let newUser = db.updateUser(user.id, {
            name: req.body.name,
            bio: req.body.bio
        });
        res.status(200).json(newUser);
    }
    if (!user) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({ message: "Need a user name and bio" });
    }
    else {
        return res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
});

server.delete('/api/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user) {
        db.deleteUser(user.id);
        res.status(204).end();
    } else {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
});


server.put('/api/users/:id', (req, res) => {
    const { id, name, bio } = req.params;
    const changes = req.body;

    let index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        changes.id = id;
        users[index] = changes;
        res.status(200).json(users[index]);
    }

    if (!index) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    if (!changes) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})


server.listen(port,  () => {
    console.log(`server listening on port ${port}`);
});