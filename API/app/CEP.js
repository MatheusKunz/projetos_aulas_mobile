import { SafeAreaView } from "react-native-safe-area-context";
import { Button, StyleSheet, Text, TextInput, Image } from "react-native";
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
  const [rua, setRua] = useState('');
  const [CEPPesquisar, setCEPPesquisar] = useState('');

  async function carregarCEP() {
    const cep = await getCEP(CEPPesquisar);
    setCidade(cep.city || 'CEP não encontrado');
    setEstado(cep.state || 'CEP não encontrado');
    setRua(cep.neighborhood || "Não possui CEP por rua")

  }

  return (
    <SafeAreaView style={estilos.container}>
      <TextInput
        value={CEPPesquisar}
        onChangeText={setCEPPesquisar}
      />
      <Button title="Pesquisar" onPress={carregarCEP} />
      <Text>{cidade}</Text>
      <Text>{estado}</Text>
      <Text>{rua}</Text>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1
  }
});