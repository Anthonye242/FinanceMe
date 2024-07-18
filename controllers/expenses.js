const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  res.render('expenses/new.ejs');
});

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('expenses/index.ejs', {
      expenses: currentUser.expenses,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.expenses.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/expenses`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:expenseId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const expense = currentUser.expenses.id(req.params.expenseId);
    res.render('expenses/show.ejs', {
      expense: expense,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:expenseId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.expenses.id(req.params.expenseId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/expenses`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:expenseId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const expense = currentUser.expenses.id(req.params.expenseId);
    res.render('expenses/edit.ejs', {
      expense: expense,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:expenseId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const expense = currentUser.expenses.id(req.params.expenseId);
      expense.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/expenses/${req.params.expenseId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

module.exports = router;
