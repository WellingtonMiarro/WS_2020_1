const app = require('./app');

/**
let porta = 3000;
if( process.env.PORT){
    porta = process.env.PORT
}
app.listen(porta);
 */
const porta =  process.env.PORT || 3000;
app.listen(porta, ()=> console.log(`App ouvindo na porta: ${porta}`));