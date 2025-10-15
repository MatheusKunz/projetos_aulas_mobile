import { View, Text, StyleSheet, Button, TextInput, FlatList, Alert } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";

const db = SQLite.openDatabaseSync('filmes.db');
db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero  TEXT,
    ano INTEGER
);
`);


function getFilmes() {
  return db.getAllSync('SELECT * FROM filmes')
};

function insertFIlmes(titulo, genero, ano) {
  db.runSync("INSERT INTO filmes (titulo, genero, ano) VALUES (?,?,?)", [
    titulo,
    genero,
    ano

  ]);
}

function deleteAllFilmes() {
  db.runSync("DELETE FROM filmes");
}

function deleteFilmes(id) {
  db.runSync("DELETE FROM filmes WHERE id = ?", [id])
}

function getFilmesByid(id) {
  const [filme] = db.getAllSync('SELECT * FROM filmes WHERE id = ?', [id]);
  return filme;
}

function updateFilmes(id, titulo, genero, ano) {
  db.runSync('UPDATE filmes SET titulo = ?, genero = ?, ano = ? WHERE id = ?', [
    titulo, genero, ano, id]
  );
}




export default function Filme() {

  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function Salvar() {
    if (!titulo.trim() || !genero.trim() || !ano.trim()) return;
    insertFIlmes(titulo.trim(), genero.trim() , parseFloat(ano));
    setTitulo("");
    setGenero("");
    setAno("");
    carregarFilmes();
  }

  function editarFilmes(id) {
    const filme = getFilmesByid(id);
    if (!filme) return;
    setTitulo(filme.titulo);
    setGenero(filme.genero);
    setAno(String(filme.ano));
    setEditandoId(id);
  }

  function atualizarFilmes() {
   if (!titulo.trim() || !genero.trim() || !ano.trim() || !editandoId) return;
    updateFilmes(editandoId, titulo, genero, parseFloat(ano));
    setTitulo("");
    setGenero("");
    setAno("");
    setEditandoId(null);
    carregarFilmes();
  }

  function carregarFilmes() {
    setFilmes(getFilmes());
  }

  function limparTudo() {
    deleteAllFilmes();
    setFilmes([]);

  }

  function excluirFilmes(id) {
    deleteFilmes(id);
    carregarFilmes();

  }

  useEffect(() => {
  carregarFilmes();
}, []);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.textoPrincipal}>Olá!</Text>
        <Text style={estilos.subtexto}>Vamos cadastrar seus filmes</Text>
      </View>

      <View style={estilos.camposEntrada}>
        <View style={estilos.linhaEntrada}>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título..."
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>

        <View style={estilos.linhaEntrada}>
          <TextInput
            value={genero}
            onChangeText={setGenero}
            placeholder="Gênero..."
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>

        <View style={estilos.linhaEntrada}>
          <TextInput
            value={ano}
            onChangeText={setAno}
            placeholder="Ano de lançamento..."
            keyboardType="numeric"
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>
      </View>
      <View style={estilos.containerBotao}>
        <Button title="Salvar" onPress={Salvar} disabled={!!editandoId} />
        <Button title="Atualizar" onPress={atualizarFilmes} disabled={!editandoId} />
        <Button title="Apagar todos os filmes" onPress={limparTudo} color="#F44336" />
      </View>

      <FlatList
        data={filmes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.containerLista}>
            <Text style={estilos.subtexto}>
            - {item.titulo} | {item.genero} | {item.ano}
            </Text>
            <View style={estilos.acoesLinha}>
              <Button title="E" color="#2e82c7ff" onPress={() => editarFilmes(item.id)} />
              <Button title="X" color="#F44336" onPress={() => excluirFilmes(item.id)} />
            </View>
          </View>)}
      />

    </SafeAreaView>


  )
};

const estilos = StyleSheet.create({

  areaSegura: {
    flex: 1
  },

  cabecalho: {
    paddingHorizontal: 10,
  },

  textoPrincipal: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  subtexto: {
    fontSize: 15,
  },

  corpo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
    marginTop: 30,

  },

  caixaTexto: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderColor: "#444141ff",
    color: "#000"
  },

  linhaEntrada: {

    flexDirection: "row",
    alignItems: "center",

  },

  campoTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#020202ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44
  },

  containerBotao: {
    marginTop: 10,
    gap: 8,
    paddingHorizontal: 10,
  },

  botao: {
    marginHorizontal: 10,
  },

  containerLista: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  acoesLinha: {
    flexDirection: "row",
    gap: 4,

  },

  camposEntrada: {
    paddingHorizontal: 10,
    gap: 8,
    marginTop: 15,
    marginBottom: 15,
  },

})