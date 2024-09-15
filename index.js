const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value : 'Tomar 3l de agua por dia',
    checked : false
}
let metas = [meta]

const metasRealizadas =  async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0) {
        console.log('Não existem metas relizadas :(')
        return
    }
    await select({
        message: 'Metas Realizadas',
        choices: [... realizadas]
    })
}
    const metasAbertas = async() => {
        const abertas = metas.filter((meta) => {
            return meta.checked != true 
        })
        if(abertas.length == 0){
            console.log("Não existe metas abertas! (:")
            return
        }
        await select ({
            message: "Metas abertas",
            choices: [...abertas]
        })
    }
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

    console.log('Meta(s) marcadas como Conclúida(s)')
}
    const start = async() => {
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
                    name : "Metas realizadas",
                    value : "realizadas"
                },
                {
                    name : "Metas abertas",
                    value : "abertas"
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
        case "realizadas" :
            await metasRealizadas()
            break
            case "abertas" :
            await metasAbertas()
            break
            case "sair":
            console.log('Até a próxima!')
            return
        } 
        
    }
 
}
start ()