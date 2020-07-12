// const http = require('http');

const express = require('express');
const shortid = require('shortid');
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



server.get('/', (req, res) => {
   res.status(200).json({Message: 'My first api project'})

});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
        if (!userInfo.name || !userInfo.bio ) {
            res.status(400).json({ errorMessage: "Please provide a name  and bio for the user" })
        }
       
    if (userInfo) {
        users.push(userInfo)
         res.status(201).json(userInfo)
    } else {
        res.status(500).json({ errorMessage: "An error has occured while saving user to the database"})
    }
//    res.status(200).json (users);
});

server.get('/api/users', (req, res) => {
   const listUsers = req.body;
   if (!listUsers) {
       res.status(500).json({ errorMessage: "User info can not be retrieved"})
   }
    res.status(200).json(users)
});


server.get ('/api/users/:id', (req, res) => {
let { id } = req.params.id;
// console.log(id, 'req.params.id');
const userInfo = users.find( ({userId}) => userId === id);
if(userInfo){res.status(200).json(userInfo)}
else (
    res.status(404).json ({message: "user id not found"})
)
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const found = users.find(user => user.id === id);

    if (found) {
        users = users.filter(user => user.id !== id)
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }

    if (!found) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }
})

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