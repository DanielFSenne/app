const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value : 'Tomar 3l de agua por dia',
    checked : false
}
let metas = [meta]
const start = async () => {

const cadastrarMeta = async () => {

    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia')
        return
}

    metas.push(
        {value:meta, checked: false}
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de metas, espaço para maracar e desmarcar e enter para finalizar essa etapa",
    choices: [...metas],
    instructions : false,
    })
    if (respostas.length == 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log('Meta(s) maracadas como Conclúida(s)')
}

    while(true){
        

        const opcao = await select ({
            message: "Menu>",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value : "cadastrar"
                
                },
                {
                    name : "Listar metas",
                    value : "listar"
                },
                {
                    name : "Sair",
                    value : 'sair'
                }
            ]
        })
        switch(opcao) {
        case "cadastrar":
            await cadastrarMeta()
            console.log(metas)
        break 
        case "listar" :
            await listarMetas()
            break
            case "sair":
            console.log('Até a próxima!')
            return
        } 
        
    }
}

start()