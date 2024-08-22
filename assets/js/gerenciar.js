
//                          0            1           2
const tipo_categoria = ['Cereais', 'Suplementos', 'Temperos']

document.addEventListener("DOMContentLoaded", () => {

    // solicita ao servidor a lista de produtos via método GET
    fetch('http://localhost:3000/produtos')

    // converte a resposta em formato json
    .then(res => res.json())

    // processa os dados da resposta
    .then(dados => {
        console.log(dados)
        if (dados.length == 0)
            alerta_erro('Nenhum produto encontrado no banco de dados')
        else
            adicionarNaTabela(dados)
    })

    .catch(erro => alerta_erro(`Erro ao consultar produtos: ${erro}`))
})

// função para mostrar todos os produtos retornados pelo servidor na tabela
const adicionarNaTabela = (dados) => {
    const tabela = document.getElementById('tabela')

    dados.forEach(produto => {
        // calcula o número da linha atual da tabela (incial = 0)
        const tamanhoTabela = tabela.rows.length

        // insere uma linha abaixo da última da tabela
        const linha = tabela.insertRow(tamanhoTabela)

        // insere as células da linha
        const id = linha.insertCell(0)  // posição = 0
        const descricao = linha.insertCell(1)  
        const categoria = linha.insertCell(2)
        const preco = linha.insertCell(3)
        const quantidade = linha.insertCell(4)
        const imagem = linha.insertCell(5)
        const alterar = linha.insertCell(6)
        const excluir = linha.insertCell(7)

        // adiciona o id no elemento a ser criado
        linha.id = produto.id

        // preenche as células de cada linha da tabela
        id.innerHTML = produto.id
        descricao.innerHTML = produto.descricao
        categoria.innerHTML =  tipo_categoria[produto.categoria]
        preco.innerHTML = produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        quantidade.innerHTML = produto.quantidade
        const url = produto.url.toLowerCase()

        // imagem da web
        if (url.substring(0, 4) == 'http') 
            imagem.innerHTML = `<img src='${url}' width='100' alt='Foto do Produto' class='img-thumbnail'>`
        else
            imagem.innerHTML = `<img src='galeria/${url}' width='100' alt='Foto do Produto' class='img-thumbnail'>`

        alterar.innerHTML = `<a href='alterar.html?id=${produto.id}'
                         class='btn btn-outline-success mt-4'>Alterar</a>`

        excluir.innerHTML = `<button onclick='excluirDaTabela(${produto.id})'
                             class='btn btn-outline-danger mt-4'>Excluir</button>`
                                
    });
}


// exclui uma linha da tabela e do banco de dados pelo id
const excluirDaTabela = (id) => {

    fetch('http://localhost:3000/produtos/' + id, {
        method: 'DELETE'

    }).then(() => document.getElementById(id).remove())

    .catch(erro => alerta_erro(`Erro ao excluir produto: ${erro}`))
}


