const socket = io('http://localhost:3000');

const renderizarMensagem = objetoMensagem =>{
    const novaLinha = `
        <div>
            <b>${objetoMensagem.usuario}</b>: ${objetoMensagem.mensagem}
        </div>
        `;
        $('#mensagensChat').append(novaLinha);
};

    socket.on('mensagensAnteriores', mensagem => mensagem.forEach(m => renderizarMensagem(m)));


    socket.on('mensagemRecebida', objetoMensagem => {
        renderizarMensagem(objetoMensagem);
    });

$('form').submit( event =>{
    event.preventDefault();

    const usuario = $('#usuario').val();
    const mensagem = $('#mensagem').val();
    $('#mensagem').val('');

    const objetoMensagem = {usuario, mensagem};
    socket.emit('enviarMensagem', objetoMensagem); // emit = serve para enviar mensagens
    renderizarMensagem(objetoMensagem);
});