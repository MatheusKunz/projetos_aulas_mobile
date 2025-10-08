# 📌 Projeto Atividades Físicas - React Native + Expo SQLite
## 🚀 Sobre o Projeto

Este projeto é um aplicativo simples para cadastro de atividades físicas, utilizando React Native com Expo e persistência de dados em um banco SQLite local.

O app permite:

- 📥 Cadastrar novas atividades
- 📋 Listar atividades cadastradas
- ✏️ Editar atividades existentes
- ❌ Excluir atividades individualmente
- 🗑️ Excluir todas as atividades de uma vez

## ⚙️ Instalações Necessárias

Antes de rodar o projeto, certifique-se de ter o [Node.js](https://nodejs.org/en/) e o Expo CLI instalados.

**1. Criar um novo projeto Expo**
```bash
npx create-expo-app meuApp
```

**2. Instalar pacotes usados no código**

Dentro da pasta do projeto, instale as dependências:

```bash
# SQLite para persistência de dados
npx expo install expo-sqlite

# SafeAreaView para evitar sobreposição em áreas seguras
npx expo install react-native-safe-area-context

# Navegação com rotas (caso use telas múltiplas)
npx expo install expo-router
```

Todos os demais pacotes (react, react-native) já vêm junto ao criar o app com `create-expo-app`.

## 📂 Estrutura Principal do Código
#### 🔹 Imports
```javascript
import { View, Text, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react"; // Adicionado useEffect
import * as SQLite from "expo-sqlite";
```

- **View, Text, Button, TextInput, FlatList** → Componentes visuais do React Native.
- **Link** → Navegação entre telas usando `expo-router`.
- **SafeAreaView** → Garante que o conteúdo não fique atrás de `notch` ou `status bar`.
- **useState, useEffect** → Hooks do React para gerenciamento de estados e ciclo de vida (efeitos colaterais).
- **SQLite** → Para interagir com o banco de dados local.

#### 🔹 Banco de Dados
```javascript
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
```
- Cria (ou abre) um banco chamado `atividades.db`.
- Define a tabela `atividades` com os campos necessários.

#### 🔹 Funções do Banco
```javascript
// Função para buscar todas as atividades
function getAtividades() {
  return db.getAllSync("SELECT * FROM atividades");
}

// Função para buscar uma atividade específica pelo ID
function getAtividadeByid(id) {
  const [atividade] = db.getAllSync('SELECT * FROM atividades WHERE id = ?', [id]);
  return atividade;
}

// Função para inserir uma nova atividade
function insertAtividades(atividade, duracaoMin, categoria) {
  // ... código ...
}

// Função para atualizar uma atividade existente
function updateAtividades(id, atividade, duracaoMin, categoria) {
  db.runSync('UPDATE atividades SET atividade = ?, duracaoMin = ?, categoria = ? WHERE id = ?', [
    atividade, duracaoMin, categoria, id
  ]);
}

// Função para apagar uma atividade pelo ID
function deleteAtividades(id) {
  // ... código ...
}
```
- **getAtividades** → retorna todas as atividades.
- **getAtividadeByid** → retorna uma atividade específica para preencher o formulário de edição.
- **insertAtividades** → insere uma nova atividade.
- **updateAtividades** → atualiza uma atividade existente.
- **deleteAtividades** → apaga uma atividade específica pelo ID.

#### 🔹 Componente Principal e Estados
```javascript
export default function Atividade() {
  const [atividade, setAtividade] = useState("");
  const [duracaoMin, setDuracaomin] = useState("");
  const [categoria, setCategoria] = useState("");
  const [atividades, setAtividades] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // Novo estado
}
```
- **Estados de formulário**: `atividade`, `duracaoMin`, `categoria`.
- **`atividades`**: armazena a lista de atividades para a `FlatList`.
- **`editandoId`**: armazena o ID da atividade que está sendo editada. Se for `null`, significa que estamos criando uma nova atividade.

#### 🔹 Efeito para Carregar Dados (`useEffect`)
```javascript
useEffect(() => {
  carregarAtividades();
}, []);
```
- Esse hook é executado **apenas uma vez** quando o componente é montado.
- Sua função é chamar `carregarAtividades()` para que a lista de atividades já salvas no banco seja exibida assim que o app abrir.

#### 🔹 Funções Auxiliares
```javascript
// Para salvar uma nova atividade
function Salvar() { /* ... */ }

// Para carregar a lista do banco
function carregarAtividades() { /* ... */ }

// Para entrar no modo de edição
function editarAtividade(id) {
  const atividade = getAtividadeByid(id);
  if (!atividade) return;
  setAtividade(atividade.atividade);
  setDuracaomin(String(atividade.duracaoMin));
  setCategoria(atividade.categoria);
  setEditandoId(id); // Define o ID para entrar no modo de edição
}

// Para salvar as alterações de um item editado
function atualizarAtividade() {
  if (!atividade.trim() || !editandoId) return;
  updateAtividades(editandoId, atividade.trim(), parseFloat(duracaoMin), categoria.trim());
  
  // Limpa os campos e sai do modo de edição
  setAtividade("");
  setDuracaomin("");
  setCategoria("");
  setEditandoId(null);
  carregarAtividades();
}
```
- **editarAtividade(id)** → Preenche os campos do formulário com os dados do item selecionado e ativa o "modo de edição" ao definir o `editandoId`.
- **atualizarAtividade()** → Salva as alterações no banco de dados e limpa o formulário, retornando ao modo de criação.

#### 🔹 Interface (JSX)
A interface agora usa o estado `editandoId` para controlar os botões de Salvar e Atualizar, e adiciona o botão de Editar na lista.

- **Botões de Ação Condicionais**
```jsx
<View style={estilos.containerBotao}>
  <Button title="Salvar" onPress={Salvar} disabled={!!editandoId} />
  <Button title="Atualizar" onPress={atualizarAtividade} disabled={!editandoId} />
</View>
```
- O botão **Salvar** fica desabilitado quando `editandoId` tem um valor.
- O botão **Atualizar** fica desabilitado quando `editandoId` é `null`.

- **Botões na Lista de Atividades (`FlatList`)**
```jsx
<FlatList
  data={atividades}
  keyExtractor={(item) => String(item.id)}
  renderItem={({ item }) => (
    <View style={estilos.containerLista}>
      <Text>
        -{item.atividade} | {item.duracaoMin} minutos | {item.categoria}
      </Text>
      <View style={estilos.acoesLinha}>
        <Button title="E" color="#2e82c7ff" onPress={() => editarAtividade(item.id)} />
        <Button title="X" color="#F44336" onPress={() => excluirAtividades(item.id)} />
      </View>
    </View>
  )}
/>
```
- Um botão "E" (Editar) foi adicionado a cada item da lista, chamando `editarAtividade(item.id)` quando pressionado.

#### 🔹 Estilização
Feita com `StyleSheet` do React Native, incluindo: `areaSegura`, `textoPrincipal`, `campoTexto`, `containerLista`, etc.

## 🛠️ Erros Comuns

- **Erro: "no such table atividades"**
  → O banco ainda não foi criado corretamente. Verifique se o `db.execSync` rodou.

- **Erro ao inserir número**
  → `duracaoMin` precisa ser convertido com `parseFloat()` antes do `insert` ou `update`.

- **Lista não atualiza**
  → Sempre chamar `carregarAtividades()` após `insert`, `delete` ou `update`.

## 📱 Como Rodar o App

Inicie o servidor Expo:
```bash
npx expo start
```
Escaneie o QR code no celular (com o app Expo Go) ou rode no emulador Android/iOS.