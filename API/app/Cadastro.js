import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";

export default function App() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [itens, setItens] = useState([]);
  const [idBusca, setIdBusca] = useState('');
  const [itemEncontrado, setItemEncontrado] = useState(null);
  const [idEditando, setIdEditando] = useState(null);

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

  async function atualizarItem(id, name, description, price) {
    const precoNumerico = parseFloat(price) || 0;
    const dadosParaEnviar = { name, description, price: precoNumerico };
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosParaEnviar)
    });
    return resposta.ok;
  }

  async function deletarItem(id) {
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`, {
      method: "DELETE"
    });
    if (resposta.ok) {
      if (idEditando === id) {
        limparFormulario();
      }
      if (itemEncontrado && itemEncontrado.id === id) {
        setItemEncontrado(null);
      }
      carregarItens();
    } else {
      alert('Falha ao excluir o item.');
    }
  }

  async function buscarItemPorId(id) {
    setItemEncontrado(null);
    if (!id) {
      alert('Por favor, informe um ID.');
      return;
    }
    const resposta = await fetch(`http://177.44.248.50:8080/items/${id}`);
    if (resposta.ok) {
      const payload = await resposta.json();
      setItemEncontrado(payload);
    } else {
      alert('Ocorreu um erro ao buscar o item.');
    }
  }

  useEffect(() => {
    carregarItens();
  }, []);

  function editar(item) {
    setIdEditando(item.id);
    setNome(item.name);
    setDescricao(item.description);
    setPreco(item.price.toString());
  }

  function limparFormulario() {
    setNome('');
    setDescricao('');
    setPreco('');
    setIdEditando(null);
  }

  async function salvar() {
    let sucesso;
    if (idEditando) {
      sucesso = await atualizarItem(idEditando, nome, descricao, preco);
    } else {
      sucesso = await cadastrarItem(nome, descricao, preco);
    }
    if (sucesso) {
      carregarItens();
      limparFormulario();
      setItemEncontrado(null);
    } else {
      alert('Falha ao salvar. Verifique os dados.');
    }
  }

  function Buscar() {
    buscarItemPorId(idBusca);
  }

  function deletar(id) {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este item?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => deletarItem(id),
          style: "destructive"
        }
      ]
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>
        {idEditando ? `Editando Item ID: ${idEditando}` : 'Cadastrar Novo Item'}
      </Text>
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
      <View style={estilos.botoes}>
        <Button
          title={idEditando ? "Atualizar" : "Salvar"}
          onPress={salvar}
        />
      </View>
      {idEditando && (
        <View style={estilos.botoes}>
          <Button
            title="Cancelar Edição"
            onPress={limparFormulario}
            color="#ff6347"
          />
        </View>)}
      <Text style={estilos.titulo}>Buscar Item por ID</Text>
      <TextInput
        value={idBusca}
        onChangeText={setIdBusca}
        placeholder="Informe o ID do item"
        placeholderTextColor="#999"
        style={estilos.input}
        keyboardType="numeric"
      />
      <View style={estilos.botoes}>
        <Button title="Buscar" onPress={Buscar} />
      </View>
      {itemEncontrado && (
        <View style={estilos.itemEncontrado}>
          <Text style={estilos.itemNome}>{itemEncontrado.name}</Text>
          <Text>ID: {itemEncontrado.id}</Text>
          <Text>Descrição: {itemEncontrado.description}</Text>
          <Text>Preço: R$ {itemEncontrado.price}</Text>
          <View style={estilos.botoesItemContainer}>
            <View style={estilos.botoesItem}>
              <Button title="Editar" onPress={() => editar(itemEncontrado)} />
            </View>
            <View style={estilos.botoesItem}>
              <Button
                title="Excluir"
                onPress={() => deletar(itemEncontrado.id)}
                color="#ff6347"
              />
            </View>
          </View>
        </View>
      )}
      <View style={estilos.botoes}>
        <Button title="Carregar lista" onPress={carregarItens} />
      </View>
      <Text style={estilos.titulo}>Itens Cadastrados</Text>
      <FlatList
        data={itens}
        renderItem={({ item }) => (
          <View style={estilos.itemLista}>
            <Text style={estilos.itemNome}>{item.name}</Text>
            <Text>Descrição: {item.description}</Text>
            <Text>Preço: R$ {item.price}</Text>
            <View style={estilos.botoesItemContainer}>
              <View style={estilos.botoesItem}>
                <Button title="Editar" onPress={() => editar(item)} />
              </View>
              <View style={estilos.botoesItem}>
                <Button
                  title="Excluir"
                  onPress={() => deletar(item.id)}
                  color="#ff6347"
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
    marginTop: 10,
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
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  botoes: {
    marginBottom: 10,
  },
  itemEncontrado: {
    padding: 12,
    backgroundColor: '#e0ffe0',
    borderColor: '#b0dbb0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  botoesItemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  botoesItem: {
    marginRight: 8,
  }
});