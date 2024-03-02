const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080

app.get('/', (request, response) => {
    console.log("Server called");
    return response.send("Welcome to the main page")
})

//Connection with mongo DB
const connect = mongoose.connect('mongodb://127.0.0.1:27017/LearningBackend-01');

connect.then(() => console.log("Mongo DB connected"));

//Schema of the database
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }

})

const User = mongoose.model('user', userSchema);

app.use(express.urlencoded({ extended: false }))

app.post('/api/users', async (request, response) => {
    const body = request.body;

    if (!body || !body.firstName || !body.lastName || !body.email) {
        return response.status(400).json({ message: "Fields are missing all fields are required" })
    }

    await User.create({
        firstName : body.firstName
        
    })

})

app.listen(8080, () => { `Server stareted on port ${PORT}` })