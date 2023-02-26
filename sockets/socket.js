const { comprobarJWt } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['x-token']);
// const valido? = 
const [valido,uid] = comprobarJWt( client.handshake.headers['x-token'] );

//console.log(valido,uid);

if(!valido){ return client.disconnect();} // si esta registrado


 usuarioConectado(uid);

 console.log('cliente autenticado', uid);


 // ingresar a una sala

 //sala global io.emit 
 // sala un cliente client.id 
 client.join( uid ); // sala uid

 // escuchar del cliente el mensaje personal
 client.on('mensaje-personal', async ( payload)=>{
        
        // Grabas mensaje 
        await grabarMensaje( payload);
        console.log(payload);
        io.to( payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
