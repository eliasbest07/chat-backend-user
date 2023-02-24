const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async ()=>{
    try {
        console.log('init db config');
       mongoose.set('strictQuery', false);

         mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: false
            
        }).then(()=>{
            console.log('Mongodb connected with server: ${data.connection.host}');
        });
console.log('DB online');
        // const Cat = mongoose.model('Cat', { name: String });
        
        // const kitty = new Cat({ name: 'Zildjian' });
        // kitty.save().then(() => console.log('meow'));
        
    } catch (error) {
        console.log(error);
        throw new Error ('Error en la base de datos - Hable con el admin ;)');

    }

}
module.exports={
    dbConnection
}