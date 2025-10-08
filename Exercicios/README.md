📌 Projeto Atividades Físicas - React Native + Expo SQLite
🚀 Sobre o Projeto

Este projeto é um aplicativo simples para cadastro de atividades físicas, utilizando React Native com Expo e persistência de dados em um banco SQLite local.

O app permite:

📥 Cadastrar novas atividades

📋 Listar atividades cadastradas

❌ Excluir atividades individualmente

🗑️ Excluir todas as atividades de uma vez

⚙️ Instalações Necessárias

Antes de rodar o projeto, certifique-se de ter o Node.js e o Expo CLI instalados.

1. Criar um novo projeto Expo
npx create-expo-app meuApp

2. Instalar pacotes usados no código

Dentro da pasta do projeto, instale as dependências:

# SQLite para persistência de dados
npx expo install expo-sqlite

# SafeAreaView para evitar sobreposição em áreas seguras
npx expo install react-native-safe-area-context

# Navegação com rotas (caso use telas múltiplas)
npx expo install expo-router


Todos os demais pacotes (react, react-native) já vêm junto ao criar o app com create-expo-app.

📂 Estrutura Principal do Código
🔹 Imports
import { View, Text, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as SQLite from "expo-sqlite";


View, Text, Button, TextInput, FlatList → Componentes visuais do React Native

Link → Navegação entre telas usando expo-router

SafeAreaView → Garante que o conteúdo não fique atrás de notch ou status bar

useState → Gerenciamento de estados (atividade, categoria, etc.)

SQLite → Banco de dados local persistente

🔹 Banco de Dados
const db = SQLite.openDatabaseSync('atividades.db');
db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    atividade TEXT NOT NULL,
    duracaoMin TEXT NOT NULL,
    categoria TEXT NOT NULL
  );
`);


Cria (ou abre) um banco chamado atividades.db

Define a tabela atividades com campos id, atividade, duracaoMin, categoria

🔹 Funções do Banco
function getAtividades() {
  return db.getAllSync("SELECT * FROM atividades");
}

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
  db.runSync("DELETE FROM atividades WHERE id = ?", [id]);
}


getAtividades → retorna todas as atividades cadastradas

insertAtividades → insere uma nova atividade

deleteAllAtividades → apaga tudo da tabela

deleteAtividades → apaga uma atividade específica pelo ID

🔹 Componente Principal
export default function Atividade() {
  const [atividade, setAtividade] = useState("");
  const [duracaoMin, setDuracaomin] = useState("");
  const [categoria, setCategoria] = useState("");
  const [atividades, setAtividades] = useState([]);


Estados usados para armazenar inputs do usuário e lista de atividades.

Funções auxiliares

Salvar() → Valida os campos e insere no banco

carregarAtividades() → Atualiza a lista exibida

limparTudo() → Limpa o banco e a lista

excluirAtividades(id) → Remove um item específico

🔹 Interface (JSX)

Inputs para atividade, duração, categoria

Botões para Salvar, Listar, Excluir todos

FlatList exibindo atividades cadastradas com botão X para excluir

Exemplo de item exibido:

-Corrida | 30 | Cardio

🔹 Estilização

Feita com StyleSheet do React Native, incluindo:

areaSegura → Preenche a tela toda

textoPrincipal → Estilo do título

campoTexto → Inputs estilizados

containerLista → Linha da lista com botão de excluir

🛠️ Erros Comuns

Erro: "no such table atividades"
→ O banco ainda não foi criado corretamente. Verifique se o db.execSync rodou.

Erro ao inserir número
→ duracaoMin precisa ser convertido com parseFloat() antes do insert.

Lista não atualiza
→ Sempre chamar carregarAtividades() após insert ou delete.

📱 Como Rodar o App

Inicie o servidor Expo:

npx expo start


Escaneie o QR code no celular (com o app Expo Go) ou rode no emulador Android/iOS.