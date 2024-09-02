import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function CreateTemtem() {
  const [nome, setNome] = useState('');
  const [tipagem, setTipagem] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [atributos, setAtributos] = useState({
    ataque: 0,
    defesa: 0,
    velocidade: 0,
    stamina: 0,
    ataqueEspecial: 0,
    defesaEspecial: 0,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAtributos((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:3001/temtem',
        { nome, tipagem, classificacao, ...atributos },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar Temtem:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Criar Temtem</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipagem</Form.Label>
          <Form.Control
            type="text"
            value={tipagem}
            onChange={(e) => setTipagem(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Classificação</Form.Label>
          <Form.Control
            type="text"
            value={classificacao}
            onChange={(e) => setClassificacao(e.target.value)}
            required
          />
        </Form.Group>
        {['ataque', 'defesa', 'velocidade', 'stamina', 'ataqueEspecial', 'defesaEspecial'].map((attr) => (
          <Form.Group className="mb-3" key={attr}>
            <Form.Label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</Form.Label>
            <Form.Control
              type="number"
              name={attr}
              value={atributos[attr]}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Criar Temtem
        </Button>
      </Form>
    </Container>
  );
}

export default CreateTemtem;
