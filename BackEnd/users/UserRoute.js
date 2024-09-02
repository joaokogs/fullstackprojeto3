const express = require('express');
const router = express.Router();
const Users = require('./User');
const Temtem = require('../temtems/Temtems'); // Importa o modelo Temtem
const jwt = require('jsonwebtoken');

// Rota para criar um novo usuário
router.post("/criar", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const userExistente = await Users.findOne({
            where: { email }
        });

        if (userExistente) {
            return res.status(400).json({ erro: 'O usuário já está cadastrado' });
        }

        const criarNovoUser = await Users.create({
            email,
            senha
        });

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', User: criarNovoUser });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Rota para realizar login de usuário
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica se o usuário existe no banco de dados
        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        if (user.senha !== senha) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, userType: 'user' },
            'seuSegredo', // Substitua por uma variável de ambiente para maior segurança
            { expiresIn: '1h' }
        );

        res.json({ mensagem: 'Login realizado com sucesso!', token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// Função para verificar o token JWT de um usuário
function tokenUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ erro: 'Token não fornecido' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ erro: 'Formato de token inválido' });
        }

        jwt.verify(token, 'seuSegredo', (err, decoded) => {
            if (err) {
                return res.status(403).json({ erro: 'Falha na autenticação do token' });
            }

            if (decoded.userType !== 'user') {
                return res.status(403).json({ erro: 'Acesso negado. Token não corresponde a um usuário.' });
            }

            req.userId = decoded.id;
            next();
        });
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}

// Rota para adicionar um novo Temtem
router.post('/temtem', tokenUser, async (req, res) => {
    const { nome, ataque, defesa, velocidade, stamina, ataqueEspecial, defesaEspecial, tipagem, classificacao } = req.body;

    try {
        const novoTemtem = await Temtem.create({
            nome,
            ataque,
            defesa,
            velocidade,
            stamina,
            ataqueEspecial,
            defesaEspecial,
            tipagem,
            classificacao,
        });

        res.status(201).json(novoTemtem);
    } catch (error) {
        console.error('Erro ao criar Temtem:', error);
        res.status(500).json({ message: 'Erro ao criar Temtem.' });
    }
});

// Rota para editar um Temtem existente
router.put('/temtem/:id', tokenUser, async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const temtem = await Temtem.findByPk(id);

        if (!temtem) {
            return res.status(404).json({ message: 'Temtem não encontrado.' });
        }

        // Atualiza apenas os campos que foram fornecidos na requisição
        Object.keys(updatedFields).forEach(field => {
            if (updatedFields[field] !== undefined) {
                temtem[field] = updatedFields[field];
            }
        });

        await temtem.save();

        res.status(200).json(temtem);
    } catch (error) {
        console.error('Erro ao editar Temtem:', error);
        res.status(500).json({ message: 'Erro ao editar Temtem.' });
    }
});

// Rota para excluir um Temtem
router.delete('/temtem/:id', tokenUser, async (req, res) => {
    const { id } = req.params;

    try {
        const temtem = await Temtem.findByPk(id);

        if (!temtem) {
            return res.status(404).json({ message: 'Temtem não encontrado.' });
        }

        await temtem.destroy();

        res.status(200).json({ message: 'Temtem excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir Temtem:', error);
        res.status(500).json({ message: 'Erro ao excluir Temtem.' });
    }
});

// Rota para listar todos os Temtems
router.get('/temtem', tokenUser, async (req, res) => {
    try {
        const temtems = await Temtem.findAll();
        res.status(200).json(temtems);
    } catch (error) {
        console.error('Erro ao listar Temtems:', error);
        res.status(500).json({ message: 'Erro ao listar Temtems.' });
    }
});

module.exports = router;
