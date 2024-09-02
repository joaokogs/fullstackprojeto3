import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/criar', { email, senha });
      navigate('/login');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Criar Conta</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
