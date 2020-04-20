 const fs = require('fs');

 

const controllers = {

    realizarUpload: (req, res) =>{
        const { name,mimetype, data} = req.files['arquivo'];
        
        //res.json(resposta);
        // cria o nome do arquivo temporario
        const nomeArquivo = `${new Date().getTime()}`; 
        console.log(nomeArquivo);

        //cria o arquivo temporario
        fs.writeFileSync(nomeArquivo, data);
        //cria a stream de leitura do arquivo temporario
        const readStream = fs.createReadStream(nomeArquivo);


        //realiza a gravação do arquivo no bd
        const Arquivo = require('../models/Arquivo');
        const metadados = {filename: name, contentType: mimetype}
        Arquivo.write(metadados, readStream, (erro, arquivo)=>{
            if(erro){
                console.log(erro);
                res.status(500).json({erro: 'Erro ao tentar salvar o arquivo'});
            } else{
                res.status(201).json({mensagem: 'arquvo foi salvo', id: arquivo._id })
            }  
        });    
    }
};

module.exports = controllers; 