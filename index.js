//config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Pessoas = require('./models/Pessoas')

//forma de ler JSON => utilizar MidleWares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
app.post('/pessoas', async(req,res)=>{

    const {nome,salario,aprovado} = req.body
    //{nome:"murilo",salario:6700,aprovado:false}

    if (!nome) {
        res.status(422).json({error: 'Nome é obrigatório!'})
    }

    const pessoas = {
        nome,
        salario,
        aprovado
    }

    try {
        await Pessoas.create(pessoas)
        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
    } catch (error) {
        res.status(500).json({error:error})
    }

})

//rota inicial / endpoint
app.get('/', (req,res)=>{

    //mostrar requisição/resposta
    res.json({
        message: 'Oi express!'
    })
})

// entregar uma porta
const DB_USER = 'murilosouza'
const DB_PASSWORD = encodeURIComponent('kU5By6v4yBrXY5vW')

mongoose 
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mmwt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)

.then(()=>{
    console.log('Conectamos ao DB com sucesso!')
    app.listen(3000)
})

.catch((err)=>{
    console.log(err)
})
 