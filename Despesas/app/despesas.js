import { View, Text, Button, StyleSheet, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('despesas.db');
db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS despesas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  );
`);

function getDespesas(){
  return db.getAllSync('SELECT * FROM despesas');
}

function insertDespesas(nome){
  db.runSync('INSERT INTO despesas (nome) VALUES (?)', [nome]);
}

export default function sqlite() {
  const [texto, setTexto] = useState("");
  const [despesas, setDespesas] = useState([]);

  function salvarDespesas() {
    const nome = texto.trim();
    if (!nome) return;
    insertDespesas(nome);
    setTexto("");
  }

  function carregarDespesas() {
    setDespesas(getDespesas());
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Despesas</Text>

      <View style={estilos.linhaEntrada}>
        <TextInput
          value={texto}
          onChangeText={setTexto}
          placeholder="Nova despesa..."
          style={estilos.campoTexto}
        />
        <Button title="Salvar" onPress={salvarDespesas} />
      </View>

      <Button title="Carregar despesas" onPress={carregarDespesas} />

      <FlatList
        data={despesas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => 
        <Text style={estilos.textoItem}>
          - {item.nome}
        </Text>}
      />

      <View style={estilos.rodape}>
        <Button title="Voltar" onPress={() => router.back()} />
        <Button title="Início" onPress={() => router.replace("/")} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  linhaEntrada: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 8, 
    gap: 8 
  },
  campoTexto: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 44 
  },
  textoItem: { 
    fontSize: 16, 
    paddingVertical: 6 
  },
  rodape: { 
    flexDirection: "row", 
    gap: 8
  },
});