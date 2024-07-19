const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const authController = require('./controllers/auth.js');
const dashboardcontroller = require('./controllers/dashboardcontroller.js');
const budgetGoalsController = require('./controllers/budgets.js');
const expensesController = require('./controllers/expenses.js');
const transactionsController = require('./controllers/transactions.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passUserToView);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Check if the user is logged in
    if (req.session.user) {
      // Redirect logged-in users to their dashboard
      res.redirect(`/users/${req.session.user._id}/dashboard`);
    } else {
      // Show the homepage for users who are not logged in
      res.render('index.ejs');
    }
  });

app.get('/dashboard', (req, res) => {
    // Render the dashboard for logged-in users
    res.render('dashboard.ejs', { user: req.session.user });
  });



app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/dashboard', dashboardcontroller)
app.use('/users/:userId/budget', budgetGoalsController); 
app.use('/users/:userId/expenses', expensesController); 
app.use('/users/:userId/transactions', transactionsController);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});