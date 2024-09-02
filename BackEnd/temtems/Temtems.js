const Sequelize = require('sequelize');
const connection = require('../database/database'); // Ajuste o caminho conforme necessário

const Temtem = connection.define('temtem', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ataque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    defesa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    velocidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stamina: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ataqueEspecial: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    defesaEspecial: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipagem: {
        type: Sequelize.ENUM(
            'Água', 'Ar', 'Terra', 'Fogo', 'Natureza', 'Elétrico', 'Mental', 'Neutral', 'Venenoso', 'Sagrado'
        ),
        allowNull: false
    },
    classificacao: {
        type: Sequelize.ENUM(
            'Ofensivo', 'Defensivo', 'Suporte'
        ),
        allowNull: false
    }
});

// Temtem.sync({force: true});

module.exports = Temtem;
