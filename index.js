const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Database
const connection = require('./database/database');
const User = require('./users/User');

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

app.listen(3000,()=>{
    console.log("Servidor Rodando!");
});