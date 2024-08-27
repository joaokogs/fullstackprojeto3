const Sequelize = require('sequelize');
const connection = require('../database/database');

const Users = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // garante que o e-mail seja único no banco de dados
        validate: {
            isEmail: true // valida se o campo é um e-mail válido
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Users.sync({force: true}); 

module.exports = Users;
