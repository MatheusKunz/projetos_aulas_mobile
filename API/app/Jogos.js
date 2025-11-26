import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, View, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";

export default function App() {

  const [nome, setNome] = useState('');
  const [slug, setSlug] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const [jogos, setJogos] = useState([]);
  const [textoBusca, setTextoBusca] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  async function carregarJogos() {
    try {
      const resposta = await fetch("http://177.44.248.50:8080/games");
      if (resposta.ok) {
        const payload = await resposta.json();
        setJogos(payload);
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  }

  async function cadastrarJogo(title, slug, description, price) {
    if (!title || !slug || !price) {
      Alert.alert("Erro", "Preencha Nome, Slug e Preço (obrigatórios).");
      return false;
    }

    const precoNumerico = parseFloat(price) || 0;
    const dadosParaEnviar = { title, slug, description, price: precoNumerico };

    try {
      const resposta = await fetch("http://177.44.248.50:8080/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
      });
      return resposta.ok;
    } catch (error) {
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
      return false;
    }
  }

  async function atualizarJogo(id, title, slug, description, price) {
    if (!title || !slug || !price) {
      Alert.alert("Erro", "Preencha os campos obrigatórios.");
      return false;
    }

    const precoNumerico = parseFloat(price) || 0;
    const dadosParaEnviar = { title, slug, description, price: precoNumerico };

    try {
      const resposta = await fetch(`http://177.44.248.50:8080/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
      });
      return resposta.ok;
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar.");
      return false;
    }
  }

  async function deletarJogo(id) {
    try {
      const resposta = await fetch(`http://177.44.248.50:8080/games/${id}`, {
        method: "DELETE"
      });
      if (resposta.ok) {
        if (idEditando === id) {
          limparFormulario();
        }
        carregarJogos();
      } else {
        Alert.alert('Erro', 'Falha ao excluir o jogo.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão.');
    }
  }

  async function buscarJogosPorNome() {
    if (!textoBusca.trim()) {
      carregarJogos();
      return;
    }
    try {
      const termo = encodeURIComponent(textoBusca);
      const resposta = await fetch(`http://177.44.248.50:8080/games/search?q=${termo}`);

      if (resposta.ok) {
        const payload = await resposta.json();
        setJogos(payload);
      } else {
        Alert.alert('Atenção', 'Nenhum jogo encontrado ou erro na busca.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao tentar buscar.');
    }
  }

  useEffect(() => {
    carregarJogos();
  }, []);

  function editar(jogo) {
    setIdEditando(jogo.id);
    setNome(jogo.title);
    setSlug(jogo.slug);
    setDescricao(jogo.description);
    setPreco(jogo.price.toString());
  }

  function limparFormulario() {
    setNome('');
    setSlug('');
    setDescricao('');
    setPreco('');
    setIdEditando(null);
  }

  async function salvar() {
    let sucesso;
    if (idEditando) {
      sucesso = await atualizarJogo(idEditando, nome, slug, descricao, preco);
    } else {
      sucesso = await cadastrarJogo(nome, slug, descricao, preco);
    }

    if (sucesso) {
      carregarJogos();
      limparFormulario();
    } else {
      Alert.alert('Atenção', 'Falha ao salvar. Tente novamente.');
    }
  }

  function deletar(id) {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este jogo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: () => deletarJogo(id), style: "destructive" }
      ]
    );
  }

  return (
    <SafeAreaView style={estilos.conteiner}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={estilos.tituloPrincipal}>Game Vault</Text>

            <View style={estilos.cartao}>
              <Text style={estilos.titulo}>
                {idEditando ? `Editando Jogo ID: ${idEditando}` : 'Cadastrar Novo Jogo'}
              </Text>

              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Título"
                placeholderTextColor="#999"
                style={estilos.campoTexto}
              />
              <TextInput
                value={slug}
                onChangeText={setSlug}
                placeholder="Slug (ex: super-mario)"
                placeholderTextColor="#999"
                style={estilos.campoTexto}
                autoCapitalize="none"
              />
              <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Descrição"
                placeholderTextColor="#999"
                style={estilos.campoTexto}
              />
              <TextInput
                value={preco}
                onChangeText={setPreco}
                placeholder="Preço"
                placeholderTextColor="#999"
                style={estilos.campoTexto}
                keyboardType="numeric"
              />
              <View style={estilos.botoes}>
                <Button
                  title={idEditando ? "Salvar Alterações" : "Cadastrar Jogo"}
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
            </View>

            <Text style={estilos.titulo}>Buscar Jogo</Text>
            <View style={estilos.areaBusca}>
              <TextInput
                value={textoBusca}
                onChangeText={setTextoBusca}
                placeholder="Digite parte do nome..."
                placeholderTextColor="#999"
                style={[estilos.campoTexto, { flex: 1, marginBottom: 0 }]}
              />
              <View style={{ marginLeft: 10 }}>
                <Button title="Buscar" onPress={buscarJogosPorNome} />
              </View>
            </View>
            <Button title="Recarregar Lista Completa" onPress={() => { setTextoBusca(''); carregarJogos(); }} color="#666" />

            <Text style={estilos.titulo}>Lista de Jogos</Text>
          </>
        }
        data={jogos}
        renderItem={({ item }) => (
          <View style={estilos.itemLista}>
            <Text style={estilos.itemNome}>{item.title}</Text>
            <Text style={estilos.itemSlug}>Slug: {item.slug}</Text>
            <Text>Descrição: {item.description || 'Sem descrição'}</Text>
            <Text style={estilos.preco}>Preço: R$ {item.price}</Text>

            <View style={estilos.areaBotoesItem}>
              <View style={estilos.botaoItem}>
                <Button title="Editar" onPress={() => editar(item)} />
              </View>
              <View style={estilos.botaoItem}>
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
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum jogo encontrado.</Text>}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5ff'
  },
  cartao: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333'
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff'
  },
  areaBusca: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  itemLista: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee'
  },
  itemNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  itemSlug: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontStyle: 'italic'
  },
  preco: {
    fontWeight: 'bold',
    color: '#2e8b57',
    marginTop: 5
  },
  botoes: {
    marginBottom: 10,
  },
  areaBotoesItem: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end'
  },
  botaoItem: {
    marginLeft: 8,
  }
});