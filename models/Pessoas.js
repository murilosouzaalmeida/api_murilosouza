const mongoose = require('mongoose')

const Pessoas = mongoose.model('Pessoas', {
    nome: String,
    salario : Number,
    aprovado: Boolean,
})

module.exports = Pessoas