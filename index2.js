const {select, input, checkbox} = require('@inquirer/prompts');

let meta = {
    value : 'Tomar 3l de água por dia',
    checked : false
};
let metas = [meta];

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    });
    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas :(');
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
        console.log('Não existem metas abertas! (:');
        return;
    }
    await select({
        message: "Metas abertas" + abertas.length,
        choices: abertas.map(meta => ({name: meta.value, value: meta.value}))
    });
};

const cadastrarMeta = async () => {
    const novaMeta = await input({message: "Digite a meta:"});

    if (novaMeta.length == 0) {
        console.log('A meta não pode ser vazia');
        return;
    }

    metas.push({ value: novaMeta, checked: false });
    console.log('Meta cadastrada com sucesso!');
};

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para navegar pelas metas, espaço para marcar/desmarcar e enter para finalizar:",
        choices: metas.map(meta => ({name: meta.value, value: meta.value})),
        instructions: false,
    });
    
    if (respostas.length == 0) {
        console.log('Nenhuma meta selecionada');
        return;
    }

    metas.forEach((m) => {
        m.checked = respostas.includes(m.value);
    });

    console.log('Meta(s) marcadas como Concluída(s)');
};

const main = async () => {
    while (true) {
        const opcao = await select({
            message: "Menu>",
            choices: [
                { name: "Cadastrar Meta", value: "cadastrar" },
                { name: "Listar metas", value: "listar" },
                { name: "Metas realizadas", value: "realizadas" },
                { name: "Metas abertas", value: "abertas" },
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
            case "sair":
                console.log('Até a próxima!');
                return;
        }
    }
};

main();
