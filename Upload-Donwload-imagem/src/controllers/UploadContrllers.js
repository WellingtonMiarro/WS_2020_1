const fs = require('fs');



const controllers = {
    

    realizarUpload: (req, res) =>{
        const { name,mimetype, data} = req.files['imagem'];   
        
        mimetype = mimetype.toLowerCase();
            if(mimetype === 'image/png' || mimetype === 'image/jpeg' || mimetype === 'image/jpg'){
                res.status(500).json({erro: 'Erro ao tentar salvar a Imagem'});
            }else{
                res.status(201).json({mensagem: 'Imagem foi salva', tipo: mimetype})
            }
        
        
        //res.json(resposta);
        // cria o nome do arquivo temporario
        const nomeArquivo = `${new Date().getTime()}`; 
        console.log(nomeArquivo);

        //cria o arquivo temporario
        fs.writeFileSync(nomeArquivo, data);
        //cria a stream de leitura do arquivo temporario
        const readStream = fs.createReadStream(nomeArquivo);


        //realiza a gravação do arquivo no bd
        const Imagem = require('../models/Imagem');
        const metadados = {filename: name, contentType: mimetype}
    

        Imagem.write(metadados, readStream, (erro, arquivo)=>{
            if(erro){
                console.log(erro);
                res.status(500).json({erro: 'Erro ao tentar salvar a imagem'});
            } else{
                res.status(201).json({mensagem: 'Imagem foi salva', id: arquivo._id })
            }  
        });    
    },

};

module.exports = controllers; 