const {createModel} = require('mongoose-gridfs');

const Imagem = createModel({modelName: 'Imagem'});
module.exports = Imagem;

