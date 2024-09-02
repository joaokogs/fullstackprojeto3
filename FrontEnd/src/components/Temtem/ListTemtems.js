import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

function ListTemtems() {
  const [temtems, setTemtems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemtems = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/temtem', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTemtems(response.data);
      } catch (error) {
        console.error('Erro ao listar Temtems:', error);
      }
    };
    fetchTemtems();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/temtem/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTemtems(temtems.filter((temtem) => temtem.id !== id));
    } catch (error) {
      console.error('Erro ao excluir Temtem:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Listagem de Temtems</h2>
      <Button variant="primary" onClick={() => navigate('/create-temtem')}>
        Criar Novo Temtem
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipagem</th>
            <th>Classificação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {temtems.map((temtem) => (
            <tr key={temtem.id}>
              <td>{temtem.nome}</td>
              <td>{temtem.tipagem}</td>
              <td>{temtem.classificacao}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(temtem.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListTemtems;
