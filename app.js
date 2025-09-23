
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./model/user'); // Make sure the path is correct
const expressLayouts = require('express-ejs-layouts'); // Add this line
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mannmitra')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(expressLayouts); 
app.use(session({
    secret: 'sih_team_pass', // Change this to a strong secret
    resave: false,
    saveUninitialized: false
}));
app.use(async (req, res, next) => {
    if (req.session.userId) {
        res.locals.user = await User.findById(req.session.userId);
    } else {
        res.locals.user = null;
    }
    next();
});
const authMiddleware = (req, res, next) => {
    // Check if the user's ID is in the session
    if (req.session.userId) {
        // User is authenticated, proceed to the next route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect('/login');
    }
};
// Routes

app.get("/booking",authMiddleware, (req, res) => res.render("booking"));
app.get("/chatbot",authMiddleware, (req, res) => res.render("AI_chatbot"));
app.get("/resources", authMiddleware,(req, res) => res.render("resource"));
app.get("/peersupport",authMiddleware, (req, res) => res.render("peerSupport"));
app.get("/admin",authMiddleware, (req, res) => res.render("addmin"));
app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/signup'); // Redirect back on error (e.g., email already exists)
    }
});
app.get('/login', (req, res) => {
    res.render('login');
});

// Route to handle login form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/login'); // User not found
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.redirect('/login'); // Password incorrect
        }
        // User is authenticated, create a session
        req.session.userId = user._id;
        res.redirect('/home'); // Redirect to a protected page after login
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
});

// A protected route to test if the user is logged in
app.get('/home', (req, res) => {
    // if (!req.session.userId) {
    //     return res.redirect('/login'); // Redirect to login if not authenticated
    // }
    // Render the home page
    res.render('home');
});
app.get('/logout', (req, res) => {
    // Destroy the user's session
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        // Redirect the user to the login page or home page
        res.redirect('/home');
    });
});
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));