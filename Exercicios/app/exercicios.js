import { View, Text, StyleSheet, Button, TextInput, FlatList, Alert } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from "react";

const db = SQLite.openDatabaseSync('atividades.db');
db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    atividade TEXT NOT NULL,
    duracaoMin  TEXT NOT NULL,
    categoria  TEXT NOT NULL
);
`);

function getAtividades() {
  return db.getAllSync('SELECT * FROM atividades')
};

function insertAtividades(atividade, duracaoMin, categoria) {
  db.runSync("INSERT INTO atividades (atividade, duracaoMin, categoria) VALUES (?,?,?)", [
    atividade,
    duracaoMin,
    categoria

  ]);
}

function deleteAllAtividades() {
  db.runSync("DELETE FROM atividades");
}

function deleteAtividades(id) {
  db.runSync("DELETE FROM atividades WHERE id = ?", [id])
}

function getAtividadeByid(id) {
  const [atividade] = db.getAllSync('SELECT * FROM atividades WHERE id = ?', [id]);
  return atividade;
}

function updateAtividades(id, atividade, duracaoMin, categoria) {
  db.runSync('UPDATE atividades SET atividade = ?, duracaoMin = ?, categoria = ? WHERE id = ?', [
    atividade, duracaoMin, categoria, id]
  );
}




export default function Atividade() {

  const [atividade, setAtividade] = useState("");
  const [duracaoMin, setDuracaomin] = useState("");
  const [categoria, setCategoria] = useState("");
  const [atividades, setAtividades] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function Salvar() {
    if (!atividade.trim() || !duracaoMin.trim() || !categoria.trim()) return;
    insertAtividades(atividade.trim(), parseFloat(duracaoMin), categoria.trim());
    setAtividade("");
    setDuracaomin("");
    setCategoria("");
    carregarAtividades();
  }

  function editarAtividade(id) {
    const atividade = getAtividadeByid(id);
    if (!atividade) return;
    setAtividade(atividade.atividade);
    setDuracaomin(String(atividade.duracaoMin));
    setCategoria(atividade.categoria);
    setEditandoId(id);
  }

  function atualizarAtividade() {
    const atividadeFormatada = atividade.trim();
    if (!atividadeFormatada || !editandoId) return;
    updateAtividades(editandoId, atividade, parseFloat(duracaoMin), categoria.trim());
    setAtividade("");
    setDuracaomin("");
    setCategoria("");
    setEditandoId(null);
    carregarAtividades();
  }

  function carregarAtividades() {
    setAtividades(getAtividades());
  }

  function limparTudo() {
    deleteAllAtividades();
    setAtividades([]);

  }

  function excluirAtividades(id) {
    deleteAtividades(id);
    carregarAtividades();

  }

  useEffect(() => {
  carregarAtividades();
}, []);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.textoPrincipal}>Olá!</Text>
        <Text style={estilos.subtexto}>Vamos cadastrar suas Atividades físicas!</Text>
      </View>

      <View style={estilos.camposEntrada}>
        <View style={estilos.linhaEntrada}>
          <TextInput
            value={atividade}
            onChangeText={setAtividade}
            placeholder="Atividade..."
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>

        <View style={estilos.linhaEntrada}>
          <TextInput
            value={duracaoMin}
            onChangeText={setDuracaomin}
            placeholder="Tempo da atividade..."
            keyboardType="numeric"
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>

        <View style={estilos.linhaEntrada}>
          <TextInput
            value={categoria}
            onChangeText={setCategoria}
            placeholder="Categoria da atividade..."
            placeholderTextColor="#999"
            style={estilos.campoTexto} />
        </View>
      </View>
      <View style={estilos.containerBotao}>
        <Button title="Salvar" onPress={Salvar} disabled={!!editandoId} />
        <Button title="Atualizar" onPress={atualizarAtividade} disabled={!editandoId} />
        <Button title="Apagar todas as atividades" onPress={limparTudo} color="#F44336" />
        <Button title="Mostrar atividades cadastradas" onPress={carregarAtividades} color="#4CAF50" />
      </View>

      <FlatList
        data={atividades}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={estilos.containerLista}>
            <Text style={estilos.subtexto}>
              -{item.atividade} | {item.duracaoMin} minutos | {item.categoria}
            </Text>
            <View style={estilos.acoesLinha}>
              <Button title="E" color="#2e82c7ff" onPress={() => editarAtividade(item.id)} />
              <Button title="X" color="#F44336" onPress={() => excluirAtividades(item.id)} />
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