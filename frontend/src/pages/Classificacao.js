import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Table, Th, Td, TdEscudo, Escudo } from "../components/styles";

const Classificacao = () => {
  const [classificacao, setClassificacao] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/classificacao").then((response) => {
      setClassificacao(response.data);
    });
  }, []);

  return (
    <Container>
      <Title>Classificação</Title>
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Escudo</Th>
            <Th>Time</Th>
            <Th>Pontos</Th>
            <Th>Vitórias</Th>
            <Th>Gols Pró</Th>
            <Th>Gols Contra</Th>
            <Th>Saldo de Gols</Th>
          </tr>
        </thead>
        <tbody>
          {classificacao.map((time, index) => (
            <tr key={index}>
              <Td>{index + 1}</Td>
              <TdEscudo>
                    <Escudo src={time.escudo || "https://via.placeholder.com/30"} alt="Escudo" />
                    {/* {time.nome} */}
                </TdEscudo>
              <Td>{time.nome}</Td>
              <Td>{time.pontos}</Td>
              <Td>{time.vitorias}</Td>
              <Td>{time.golsPro}</Td>
              <Td>{time.golsContra}</Td>
              <Td>{time.saldoGols}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Classificacao;
