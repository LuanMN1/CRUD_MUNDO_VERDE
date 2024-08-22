document.addEventListener('DOMContentLoaded', () => {

    // lê o valor do parametro categoria a partir da url
    const urlParams = new URLSearchParams(window.location.search)
    const categoria = urlParams.get('categoria')
    let url

    if (categoria == null)
        url = "http://localhost:3000/produtos"
    else
        url = "http://localhost:3000/produtos/categoria/" + categoria

    // solcita ao servidor a lista de todos os produtos ou por categoria
    fetch(url)

        // converte a resposta do servidor para formato json
        .then(res => res.json())

        // processa a resposta em formato json
        .then(dados => {
            if (dados.length == 0)
                alerta_erro('Nenhum produto encontrado no banco de dados')
            else
                criarGaleriaDeProdutos(dados)
        })

        // captura erro, se houver
        .catch(erro => alerta_erro(`Erro ao consultar banco de dados: ${erro}`))
})

const criarGaleriaDeProdutos = (dados) => {
    const galeria = document.getElementById('galeria')

    dados.forEach(p => {
        
        let url = p.url.toLowerCase()
        if(url.substring(0,4) != 'http'){
            url = 'galeria/' + url // ex.: 'galeria/cereais.png'
        }

        const preco = p.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

        galeria.innerHTML +=
            `<div class="col" >` +
                `<div class="card mb-4" style="width: 18rem;">` +
                    `<img src="${url}" class="card-img-top" alt="Foto do Produto">` +
                    `<div class="card-body">` +
                        `<h5 class="card-title">${p.descricao}</h5>` +
                        `<h6 class="card-subtitle mb-2 text-muted">${preco}</h6>` +
                        `<p class="card-text">Restam. ${p.quantidade}</p>` +
                        `<p class="card-text">Cód. ${p.id}</p>` +
                        `<a href="#" class="btn btn-primary">Comprar</a>` +
                    `</div>` +
                `</div>` +
            `</div >`

    })
}