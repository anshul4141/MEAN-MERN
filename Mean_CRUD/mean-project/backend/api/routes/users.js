var express = require('express');
var userModel = require('../models/user');
var router = express.Router();

router.use(express.json()); // Middleware to parse JSON bodies

/* GET users listing. */
router.get('/users', async function(req, res, next) {
  try {
    // Find all users in the database
    const users = await userModel.find({});
    console.log('Users retrieved:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Error retrieving users' });
  }
});

/* GET user by ID. */
router.get('/users/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User retrieved:', user);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ error: 'Error retrieving user' });
  }
});

/* POST register new user. */
router.post('/register', function(req, res, next) {
  var userDetails = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address
  });

  userDetails.save()
    .then(savedUser => {
      console.log('User saved:', savedUser);
      res.status(201).json({ 
        message: 'User created successfully', 
        user: savedUser 
      });
    })
    .catch(err => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Error saving user' });
    });
});

/* PUT update user details. */
router.put('/users/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;
    const updatedUserDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      dob: req.body.dob,
      address: req.body.address
    };

    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedUserDetails, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User updated:', updatedUser);
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

/* DELETE remove user. */
router.delete('/users/:id', async function(req, res, next) {
  try {
    const userId = req.params.id;
    await userModel.findByIdAndDelete(userId);
    console.log('User deleted');
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
