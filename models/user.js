const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
});

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
});

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    // type: {
    //     type: String,
    //     required: true,
    //     // enum: ['income', 'expense'],
    // },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    budgetGoals: [budgetSchema], // Embedding Budget Goals
    expenses: [expenseSchema], // Embedding Expenses
    transactions: [transactionSchema], // Embedding Transactions
});

const User = mongoose.model('User', userSchema);

module.exports = User;
