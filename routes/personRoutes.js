const router = require('express').Router()

const { restart } = require('nodemon')
const Pessoas = require('../models/Pessoas')

//Create - criação de dados
router.post('/', async(req,res)=>{

    const {nome,salario,aprovado} = req.body
    //{nome:"murilo",salario:6700,aprovado:false}

    if (!nome) {
        res.status(422).json({error: 'Nome é obrigatório!'})
        return
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

//Read - Leitura de dados
router.get('/', async (req, res) => {

    try {
        
        const cadastrados = await Pessoas.find()

        res.status(200).json(cadastrados)

    } catch (error) {
        res.status(500).json({error:error})
    }

})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const pessoas = await Pessoas.findOne({_id: id })

        if (!pessoas) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return 
        }

        res.status(200).json(pessoas)
    } catch (error) {
        res.status(500).json({error:error})
    }

})

//Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome,salario,aprovado} = req.body

    const pessoas = {
        nome,
        salario,
        aprovado
    }

    try {

        const updatedPessoas = await Pessoas.updateOne({_id : id}, pessoas)

        if (updatedPessoas.matchedCount === 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return 
        }

        res.status(200).json(pessoas)
        
    } catch (error) {
        res.status(500).json({error:error})
    }

})

//Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const pessoas = await Pessoas.findOne({_id: id })

        if (!pessoas) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return 
        }

    try {

        await Pessoas.deleteOne({_id : id})

        res.status(200).json({message: 'Usuário deletado com sucesso!'})
        
    } catch (error) {
        res.status(500).json({error:error})
    }
})

module.exports = router