import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*REGISTER USER */
export const signUp = async (req, res) => {
    try{
    // Destructure relevant data from the request body
        const {
            firstName, 
            lastName,
            email, 
            password,
        } = req.body;
    
    // Generate a salt and hash the password using bcrypt
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

    // Check if the user with the given email already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(500).send("User with given email already exists!");
      }
    
    // Create a new User instance with hashed password and other details
        const newUser = new User({
            firstName, 
            lastName,
            email, 
            password: passwordHash,
        });

    // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
    // Handle any errors that may occur during the registration process
        res.status(500).json({ error: err.message });
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        // Find a user with the provided email in the database
        const user = await User.findOne({ email: email})
        if(!user) return res.status(400).json({msg: "User does not exist. "});

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        // If the email and password are valid, generate a JSON Web Token (JWT)
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);

        // Remove the password from the user object before sending it in the response
        delete user.password;
        res.status(200).json({ token, user});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// User logout
export const logout = (req, res) => {
    try {
      if (req.session) {
        req.session.destroy(); // Destroy the session
      }
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };