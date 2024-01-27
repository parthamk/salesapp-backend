const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) =>{
  try {
    // Validate all required fields
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
      return res.status(400).json({message: 'All fields are required'});
    }

    // Validate password is alphanumeric
    // const alphanumericRegex = /^[0-9a-zA-Z]+$/;
    // if(!alphanumericRegex.test(req.body.password)){
    //   return res.status(400).json({message: 'Password must be alphanumeric.'})
    // }
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // check if user with the email already exists
    const existingUser = await User.findOne({email:req.body.email});
    if(existingUser){
      return res.status(400).json({message: 'User already exist. Please log in'})
    }

    // Create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    })

    // Saver the user to the database
    const savedUser = await user.save();

    // Generate JWT token
    const token = jwt.sign({userId: savedUser._id}, process.env.JWT_SECRET);

    // Send the token as a response
    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({message:err.message})
  }
}

exports.login = async (req, res) =>{
  try {
    // Check if user with the provided email exists
    const user = await User.findOne({email: req.body.email});
    console.log(user);
    if(!user){
      return res.status(401).json({message: 'Invalid email or password'})
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if(!passwordMatch){
      return res.status(401).json({message: 'Invalid email or password.'});
    }

    // Generate JWT token
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);

    // send the token as a response
    res.status(200).json(
      {
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      }
    )
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}