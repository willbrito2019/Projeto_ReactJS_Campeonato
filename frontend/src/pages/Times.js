import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Form, Input, Button, TimeCard, Escudo } from "../components/styles";

export default function Times() {
  const [times, setTimes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/times").then((response) => {
      setTimes(response.data);
    });
  }, []);

  const adicionarTime = (e) => {
    e.preventDefault();
    if (!novoNome) return;

    const novo = { nome: novoNome, pontos: 0, golsPro: 0, saldoGols: 0 };
    axios.post("http://localhost:5000/times", novo).then((response) => {
      setTimes([...times, response.data]);
      setNovoNome("");
    });
  };

  const editarTime = (id, nome) => {
    setEditando(id);
    setNovoNome(nome);
  };

  const salvarEdicao = (id) => {
    axios
      .put(`http://localhost:5000/times/${id}`, { nome: novoNome })
      .then((response) => {
        setTimes(times.map((t) => (t._id === id ? response.data : t)));
        setEditando(null);
      });
  };

  return (
    <Container>
        <Title>Times do Campeonato</Title>
        <Form onSubmit={adicionarTime}>
            <Input
                type="text"
                placeholder="Nome do Time"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
            />
            <Button type="submit">Adicionar Time</Button>
        </Form>
      <h2>Times</h2>
      {times.map((time) => (
        <TimeCard key={time._id}>
          <Escudo src={time.escudo || "https://via.placeholder.com/40"} alt="Escudo" />
          {editando === time._id ? (
            <>
              <Input
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
              />
              <Button onClick={() => salvarEdicao(time._id)}>Salvar</Button>
            </>
          ) : (
            <>
              <span>{time.nome}</span>
              <Button onClick={() => editarTime(time._id, time.nome)}>Editar</Button>
            </>
          )}
        </TimeCard>
      ))}
    </Container>
  );
}
