async function buscaEndereco(cep) {
   let mensagemErro = document.querySelector("#erro");
   mensagemErro.innerHTML = '';
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('Cep não existente');
        }

        let cidade = document.querySelector('#cidade');
        let logradouro = document.querySelector('#endereco');
        let estado = document.querySelector('#estado');
        let bairro = document.querySelector('#bairro');
        
        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = '<p>CEP inválido. Tente novamente!</p>'
        console.log(erro);
    }
}

var cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

// var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(resposta => resposta.json()) //entao converta p/ JSON
//     .then(r => {
//         if (r.erro) {
//             throw Error('Esse cep não existe')
//         } else {
//             console.log(r)//entao exiba
//         }
//     })
//     .catch(erro => console.log(erro))//pega o erro e exibe na tela
//     .finally(mensagem => console.log("Processamento concluído!"));

// let ceps = ['01001000','75740000']

// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
// Promise.all(conjuntoCeps).then(respostas => console.log(respostas))