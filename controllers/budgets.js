const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  res.render('budgets/new.ejs');
});

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('budgets/index.ejs', {
      budgets: currentUser.budgets,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.budgets.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/budgets`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:budgetId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const budget = currentUser.budgets.id(req.params.budgetId);
    res.render('budgets/show.ejs', {
      budget: budget,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:budgetId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.budgets.id(req.params.budgetId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/budgets`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:budgetId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const budget = currentUser.budgets.id(req.params.budgetId);
    res.render('budgets/edit.ejs', {
      budget: budget,
    });
    }catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:budgetId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const budget = currentUser.budgets.id(req.params.budgetId);
      budget.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/budgets/${req.params.budgetId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});
  

module.exports = router;
