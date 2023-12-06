const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/registration_form', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose schema and model
const userSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    age: Number,
    gender: String,
    projectDetails: String,
});

const User = mongoose.model('User', userSchema);

// Handle form submissions
app.post('/submit', (req, res) => {
    const userData = req.body;

    // Create a new user document
    const newUser = new User(userData);

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Registration successful!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
