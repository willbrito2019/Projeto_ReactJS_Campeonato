import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Title, Form, Select, Input, Button, GameList, GameItem } from "../components/styles";

const Jogos = () => {
  const [times, setTimes] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState({
    timeCasa: "",
    timeFora: "",
    golsCasa: "",
    golsFora: "",
  });
  
   const adicionarJogo = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/jogos", novoJogo);
            buscarJogos(); // Atualiza a lista de jogos após a inserção
            setNovoJogo({ timeCasa: "", timeFora: "", golsCasa: "", golsFora: "" });
        } catch (error) {
            console.error("Erro ao adicionar jogo", error);
        }
    };

    // Criar uma função separada para buscar os jogos
    const buscarJogos = () => {
        axios.get("http://localhost:5000/jogos").then((response) => {
        setJogos(response.data);
        });
    };
  
    // Chamar buscarJogos() no useEffect
    useEffect(() => {
            axios.get("http://localhost:5000/times").then((response) => {
            setTimes(response.data);
        });
    
        buscarJogos();
    }, []);

    return (
        <Container>
        <Title>Cadastro de Jogos</Title>

        <Form onSubmit={adicionarJogo}>
            <Select
                required
                value={novoJogo.timeCasa}
                onChange={(e) => setNovoJogo({ ...novoJogo, timeCasa: e.target.value })}
            >
            <option value="">Selecione o Time da Casa</option>
            {times.map((time) => (
                <option key={time._id} value={time._id}>
                {time.nome}
                </option>
            ))}
            </Select>

            <Input
                type="number"
                required
                placeholder="Gols do Time da Casa"
                value={novoJogo.golsCasa}
                onChange={(e) => setNovoJogo({ ...novoJogo, golsCasa: e.target.value })}
            />

            <Select
                required
                value={novoJogo.timeFora}
                onChange={(e) => setNovoJogo({ ...novoJogo, timeFora: e.target.value })}
            >
            <option value="">Selecione o Time de Fora</option>
            {times.map((time) => (
                <option key={time._id} value={time._id}>
                {time.nome}
                </option>
            ))}
            </Select>           

            <Input
                type="number"
                required
                placeholder="Gols do Time de Fora"
                value={novoJogo.golsFora}
                onChange={(e) => setNovoJogo({ ...novoJogo, golsFora: e.target.value })}
            />

            <Button type="submit">Adicionar Jogo</Button>
        </Form>

        <Title>Lista de Jogos</Title>
        <GameList>
            {jogos.map((jogo) => (
            <GameItem key={jogo._id}>
                {/* <Escudo src={jogo.timeCasa.escudo || "https://via.placeholder.com/30"} alt="Escudo" /> */}
                {jogo.timeCasa?.nome} 
                &nbsp;
                {jogo.golsCasa} 
                 x                 
                {jogo.golsFora} 
                &nbsp;
                {/* <Escudo src={jogo.timeFora.escudo || "https://via.placeholder.com/30"} alt="Escudo" /> */}
                {jogo.timeFora?.nome}
            </GameItem>
            ))}
        </GameList>         

        </Container>
    );
};

export default Jogos;
