const express = require('express');
const router = express.Router();
const Users = require('./User');
const jwt = require('jsonwebtoken');

// Rota para criar um novo usuario
router.post("/criar", async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      const userExistente = await Users.findOne({
        where: { email }
      });
  
      if (userExistente) {
        return res.status(400).json({ erro: 'O usuario já está cadastrado' });
      }
  
      const criarNovoUser = await Users.create({
        email,
        senha
      });
  
      res.status(201).json({ mensagem: 'Usuario cadastrado com sucesso!', User: criarNovoUser });
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
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
  
      if (!senha) {
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
  
      // O token JWT geralmente é fornecido como "Bearer <token>", por isso o split para obter apenas o token
      const token = authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ erro: 'Formato de token inválido' });
      }
  
      // Verifica e decodifica o token JWT
      jwt.verify(token, 'seuSegredo', (err, decoded) => {
        if (err) {
          return res.status(403).json({ erro: 'Falha na autenticação do token' });
        }
  
        // Verifica se o token pertence a um usuário comum
        if (decoded.userType !== 'user') {
          return res.status(403).json({ erro: 'Acesso negado. Token não corresponde a um usuário.' });
        }
  
        // Armazena o ID do usuário no objeto req para uso nas próximas middlewares ou rotas
        req.userId = decoded.id;
        next();
      });
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  }
  
  module.exports = tokenUser;
  

  module.exports = router;
  