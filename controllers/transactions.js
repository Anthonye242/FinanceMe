const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/new', async (req, res) => {
  res.render('transactions/new.ejs');
});

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('transactions/index.ejs', {
      transactions: currentUser.transactions,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.transactions.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:transactionId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const transaction = currentUser.transactions.id(req.params.transactionId);
    res.render('transactions/show.ejs', {
      transaction: transaction,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:transactionId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.transactions.id(req.params.transactionId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/transactions`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:transactionId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const transaction = currentUser.transactions.id(req.params.transactionId);
    res.render('transactions/edit.ejs', {
      transaction: transaction,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.put('/:transactionId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const transaction = currentUser.transactions.id(req.params.transactionId);
      transaction.set(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/transactions/${req.params.transactionId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;
