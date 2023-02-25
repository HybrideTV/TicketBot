const mongoose = require('mongoose');
const Profils = new mongoose.Schema({
    userId: {type: Number, required:true},
    userName: {type: String, required:true},
    ticket: {type: Number, required:true},
});

const Profil = module.exports = mongoose.model('profil', Profils);