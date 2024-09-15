const {select, input, checkbox} = require('@inquirer/prompts');

let meta = {
    value : 'Tomar 3l de água por dia',
    checked : false
};
let metas = [meta];


let mensagem = "Bem-Vindo ao apps de Metas";

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });
    if (realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas :(';
        return;
    }
    await select({
        message: 'Metas Realizadas' + realizadas.length,
        choices: realizadas.map(meta => ({name: meta.value, value: meta.value}))
    });
};

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    });
    if (abertas.length == 0) {
        mensagem = 'Não existem metas abertas! (:';
        return;
    }
    await select({
        message: "Metas abertas" + abertas.length,
        choices: abertas.map(meta => ({name: meta.value, value: meta.value}))
    });
};

const deletarMetas = async () => {
const mestasDesmarcadas = metas.map((meta)=>{
        return {value : meta.value, checked: false}
    })
    const itemsADeletar = await checkbox({
        message: "Selecione itens para deletar",
        choices: metas.map(meta => ({name: meta.value, value: meta.value})),
        instructions: false,
    }); 
    if(itemsADeletar.length == 0) {
        mensagem = 'Nenhum item para deletar'
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
        mensagem = 'Metas Deletadas'
    })
    //console.log(respostas)  
}

const mostrarMensagem = () => {
    console.clear();
    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}
const cadastrarMeta = async () => {
    const novaMeta = await input({message: "Digite a meta:"});

    if (novaMeta.length == 0) {
        mensagem = 'A meta não pode ser vazia';
        mensagem = "Meta Cadastrada com sucesso"
        return;
    }

    metas.push({ value: novaMeta, checked: false });
    mensagem = 'Meta cadastrada com sucesso!';
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para navegar pelas metas, espaço para marcar/desmarcar e enter para finalizar:",
        choices: metas.map(meta => ({name: meta.value, value: meta.value})),
        instructions: false,
    });
    
    if (respostas.length == 0) {
        mensagem = 'Nenhuma meta selecionada';
        return;
    }

    metas.forEach((m) => {
        m.checked = respostas.includes(m.value);
    });

    mensagem ='Meta(s) marcadas como Concluída(s)'
};

const main = async () => {
    while (true) {
    mostrarMensagem()

        const opcao = await select({
            message: "Menu>",
            choices: [
                { name: "Cadastrar Meta", value: "cadastrar" },
                { name: "Listar metas", value: "listar" },
                { name: "Metas realizadas", value: "realizadas" },
                { name: "Metas abertas", value: "abertas" },
                { name: "Deletar metas,", value : "deletar"},
                { name: "Sair", value: 'sair' }
            ]
        });

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break;
            case "listar":
                await listarMetas();
                break;
            case "realizadas":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "deletar":
                await deletarMetas();
                break
            case "sair":
                console.log('Até a próxima!');
                return;
        }
    }
};

main();
