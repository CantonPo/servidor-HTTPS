const express = require('express');
const app = express();
app.use(express.json());
const messages = [];
const {getMessages, addMessage} = require('./database.js');

//Configuracion de las opciones HTTPS
    const options = {
        key : fs.readFileSync(path.join(__dirname, 'privkey.pem')),
        cert : fs.readFileSync(path.join(__dirname, 'fullchain.pem'))
    }

const APIKEY = "123456";

app.get('/', (req, res) => {
  res.send('Bienvenido al despliegue del servidor de Dani!');
})

app.get('/message', (req, res) => {    
   // Devolver mensajes alamacenados en la BBDD
   const apikey = req.headers['apikey'];
   if (apikey !== APIKEY){
     return res.status(401).send('Unauthorized');
    }else if (apikey === APIKEY){
      res.json(getMessages());
      return res.status(200).send('OK');  
   }
})

app.post('/message', (req, res) => {    
   // Guardar mensajes en la BBDD
   const apikey = req.headers['apikey'];
  if (apikey !== APIKEY) {
    return res.status(401).send('Unauthorized');
  }

  // Manda el mensaje por la query y lo añadade a la BBDD
  const message = req.body.message;  
  if (message) {
    addMessage(message);
    res.status(201).send('Message added');
  } else {
    res.status(400).send('Bad Request');
  }
})

https.createServer(options, app),listen(port, () => {    
    console.log('Servidor corriendo en https://cyberbunny.online:${port}');
})