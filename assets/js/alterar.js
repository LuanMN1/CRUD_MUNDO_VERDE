document.addEventListener('DOMContentLoaded', () => {
    
    // lê o valor do parâmetro id a partir da url
    // Ex: http://localhost:5500/alterar.html?id=7
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')  // 7

    // solicita ao servidor o produto com id=7
    fetch('http://localhost:3000/produtos/' + id)

    // convete a resposta em formato json
    .then(res => res.json())

    // processa os dados da resposta em json
    .then(data => {
        if (data.length > 0){
            const produto = data[0]
            preencher_formulario(produto)
        } else 
            alerta_erro(`Erro: nenhum produto encontrado com id=${id}`)

    // captura erro se houver
    }).catch(() => alerta_erro(`Erro ao buscar produto com id=${id}`))
})


const preencher_formulario = (p) => {

    setById('id', p.id)
    setById('descricao', p.descricao)
    setById('categoria', p.categoria)
    setById('preco', p.preco.toString().replace('.',','))
    setById('quantidade', p.quantidade)
    setById('url', p.url)
}
// função auxiliar

const setById= (campo, valor) => {
    document.getElementById(campo).value = valor
}

const getById = (campo) => {
    return document.getElementById(campo).value
}

// envia dados do formulário via método PUT
const atualizar = () => {
    if(!validar_formulario())
        return
    // cria um objeto JS
    const dados = {
        id : getById('id'),
        descricao : getById('descricao'),
        categoria : parseInt(getById('categoria')),
        preco : parseFloat(getById('preco').replace('.', ',')),
        quantidade : parseInt(getById('quantidade')),
        url : getById('url')
    }
    
    console.log(dados)

    // envia o objeto para o backend
    fetch('http://localhost:3000/produtos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(res => res.json()

    //processa o objeto json
    ).then(data => {
        console.log('Retorno do Servidor:\n', data)
        location.href = 'gerenciar.html'
    })
    //processa erro se houver
    .catch(erro => alerta_erro(`Erro ao atualizar produto: ${erro}`))
}