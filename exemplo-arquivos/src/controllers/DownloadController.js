const controllers = {
    realizzarDownload: (req, res) => {
        const id = req.params.id;

        const Arquivo = require('../models/Arquivo');
        Arquivo.findById(id, (erro, anexo ) => {
            if(erro){
                console.log(erro);
                res.status(500).json({mensagem: 'Erro ao tentar fazer o Download'});
            }else{
                if(anexo){ //caso de sucesso
                    const nomeArquivo = anexo.filename;
                    const readStream = anexo.read();
                    //realiza o download
                    res.attachment(nomeArquivo);
                    readStream.pipe(res);
                }else{
                    res.status(404).json({mensagem: 'Arquivo Não encontrado'});
                }
            }
        });
    },

    listarTodosArquivos: (req, res) => {
        const Arquivo = require('../models/Arquivo');
        Arquivo
            .find()
            .then( 
                resposta => {
                    const arquivos= resposta.map( //mapeamento 
                        arquivo =>{
                            return{ //relação dos campos que eu quero 
                                id: arquivo._id,
                                tamanhoEmBytes: arquivo.length,
                                nome: arquivo.filename,
                                dataUpload: arquivo.uploadDate,
                                tipo: arquivo.contentType
                            }
                        }
                    ) 
                    res.json(arquivos);
                })
            .catch( erro => { console.log(erro);
                res.status(500).json({mensagem: 'Erro ao listar os Arquivos'});
            });
    }
}
module.exports = controllers; 