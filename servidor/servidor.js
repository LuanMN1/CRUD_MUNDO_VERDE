
import { apagarProduto, atualizarProduto, buscarProdutoPorId, inserirProduto, listarProdutos, listarProdutosPorCategoria } from './db.js'
import express from 'express'
import bodyParser from 'body-parser'

const port = 3000
// instancia o servidor
const server = express()

server.use(express.json())
server.use(bodyParser.urlencoded({extended: true}))

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
})

// Métodos HTTP

// método GET: localhost:3000/
// req = objeto requisição recebida pelo get()
// res = objeto resposta a ser enviada
server.get('/', async(req, res) => {
    return res.status(200).send('<h1>Bem vindo à API Rest</h1>')
})

// rotas, routes ou endpoints => 'links' (ou url) de acesso à API Rest
// método GET: localhost:3000/produtos
server.get('/produtos', async(req, res)=> {
    const produtos = await listarProdutos()
    return res.status(200).json(produtos)
})

// retorna um produto por id
// método GET: localhost:3000/produtos/1
server.get('/produtos/:id', async(req, res) => {
    const {id} = req.params
    const produto = await buscarProdutoPorId(id)
    return res.status(200).json(produto)
})


// lista produtos por categoria
// método GET: localhost:3000/produtos/categoria/0
server.get('/produtos/categoria/:categoria', async(req, res) => {
    const {categoria} = req.params
    const produtos = await listarProdutosPorCategoria(categoria)
    return res.status(200).json(produtos)
})

// apaga um produto por id
// método DELETE: localhost:3000/produtos/1
server.delete('/produtos/:id', async(req, res) => {
    const {id} = req.params
    const retorno = await apagarProduto(id)
    return res.status(200).json({'retorno' : retorno.affectedRows == 1})
})

// salva um produto
// método POST: localhost:3000/produtos
server.post('/produtos', async(req, res) => {
    const produto = req.body
    const retorno = await inserirProduto(produto)
    return res.status(200).json({'retorno' : retorno.affectedRows == 1})
})
 

// atualiza produto
// método PUT: localhost:3000/produtos
server.put('/produtos', async(req, res) => {
    const produto = req.body
    const retorno = await atualizarProduto(produto)
    return res.status(200).json({'retorno': retorno.affectedRows == 1})
})


// inicia a execução do servidor na porta 3000
server.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`)
})

