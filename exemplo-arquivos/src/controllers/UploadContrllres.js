const controllers = {

    realizarUpload: (req, res) =>{
        const { name, size, mimetype} = req.files['arquivo'];
        const resposta = {
            nome: name,
            tamanho: (size / 1024) / 1024,
            tipo: mimetype
        };
        res.json(resposta);
    
    }

};

module.exports = controllers;