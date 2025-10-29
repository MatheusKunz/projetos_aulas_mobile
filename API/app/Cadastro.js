import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(''); 
  const [itens, setItens] = useState([]);

  async function carregarItens() {
    const resposta = await fetch("http://177.44.248.50:8080/items");
    if (resposta.ok) {
      const payload = await resposta.json();
      setItens(payload); 
    }
  }

  async function cadastrarItem(name, description, price) {
    const precoNumerico = parseFloat(price) || 0; 
    const dadosParaEnviar = { name, description, price: precoNumerico };

    const resposta = await fetch("http://177.44.248.50:8080/items", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosParaEnviar) 
    });

    return resposta.ok;
  }

  useEffect(() => {
    carregarItens();
  }, []);

  async function salvar() {
    const sucesso = await cadastrarItem(nome, descricao, preco);
    if (sucesso) {
      carregarItens(); 
      setNome('');
      setDescricao('');
      setPreco('');
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Cadastrar Novo Item</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Informe o nome"
        placeholderTextColor="#999"
        style={estilos.input}
      />
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Informe a descrição"
        placeholderTextColor="#999"
        style={estilos.input}
      />
      <TextInput
        value={preco}
        onChangeText={setPreco}
        placeholder="Informe o preço"
        placeholderTextColor="#999"
        style={estilos.input}
        keyboardType="numeric" 
      />
      <Button title="Salvar" onPress={salvar} /> 

      <Text style={estilos.titulo}>Itens Cadastrados</Text>
      <FlatList
        data={itens} 
        keyExtractor={(item) => item.id ? item.id.toString() : item.name} 
        renderItem={({ item }) => (
          <View style={estilos.itemLista}>
            <Text style={estilos.itemNome}>{item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Preço: R$ {item.price}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5ff' 
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  itemLista: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  }
});