

// função para enviar dados do formulário via método post

const salvar = () => {

    if (!validar_formulario())
        return

    const dados = {
        descricao : document.getElementById('descricao').value,
        categoria :  parseInt(document.getElementById('categoria').value),
        preco : parseFloat(document.getElementById('preco').value.replace(',', '.')),
        quantidade : parseInt(document.getElementById('quantidade').value),
        url : document.getElementById('url').value
    }

    console.log('Dados enviados ao servidor:\n',dados)

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // converte objeto js em string para poder enviar
        body: JSON.stringify(dados)
    
        
        // após enviar, recebe a resposta do servidor em formata string,
        // entao converte em objeto json
    }).then(res => res.json()

    ).then(data => {
        console.log('Retorno do Servidor:\n', data)
    
    }).then(() => {
        console.log('Sucesso ao cadastrar produto!')
        location.href = 'index.html'

    }).catch(erro => alerta_erro(`Erro ao cadastrar produto: ${erro}`))

}