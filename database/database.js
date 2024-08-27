const Sequelize = require('sequelize');
const connection = new Sequelize('temtem','root','04112003',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;