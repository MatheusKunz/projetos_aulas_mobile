import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, Image, View } from "react-native";
import { useState, useEffect } from "react";

async function getCEP(cep) {
  const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  if (resposta.ok) {
    const payload = await resposta.json();
    return payload;
  }
  return null;
}

getCEP();

export default function CEP() {
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairo] = useState('');
  const [rua, setRua] = useState('')
  const [CEPPesquisar, setCEPPesquisar] = useState('');

  async function carregarCEP() {
    const cep = await getCEP(CEPPesquisar);
    setCidade(cep.city || 'CEP não encontrado');
    setEstado(cep.state || 'CEP não encontrado');
    setBairo(cep.neighborhood || "Não possui CEP por bairro")
    setRua(cep.street || "Não possui CEP por rua")

  }

  return (
    <SafeAreaView style={estilos.container}>
      <TextInput
        value={CEPPesquisar}
        onChangeText={setCEPPesquisar}
        placeholder="Informe o CEP"
        placeholderTextColor="#999"
        style={estilos.busca}
      />
      <Button style={estilos.botao} title="Pesquisar" onPress={carregarCEP} />
      <View style={estilos.lista}>
        <Text>{estado}</Text>
        <Text>{cidade}</Text>
        <Text>{bairro}</Text>
        <Text>{rua}</Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  busca: {
    borderWidth: 1,
    borderColor: "#020202ff",
    borderRadius: 8,
    marginBottom: 8
  },

  lista: {
    marginTop: 8,
    gap: 8
  }
});