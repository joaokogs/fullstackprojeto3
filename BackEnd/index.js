const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Database
const connection = require('./database/database');
const User = require('./users/User');

app.use(cors());

//BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
const UserRoutes = require('./users/UserRoute');

app.use("/",UserRoutes);







connection
    .authenticate()
    .then(()=>{
        console.log("A conexão feita com sucesso!");
    }).catch((error)=>{
        console.log(error);
    })

app.listen(3001,()=>{
    console.log("Servidor Rodando!");
});