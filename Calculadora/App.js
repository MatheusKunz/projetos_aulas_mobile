import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  const [resultado, setResultado] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  function somar(n1, n2) {
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    const soma = n1Convertido + n2Convertido;
    return soma;
  }

  function subtrair(n1, n2) {
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    const subtracao = n1Convertido - n2Convertido;
    return subtracao;
  }

  function multiplicar(n1, n2) {
    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    const multiplicacao = n1Convertido * n2Convertido;
    return multiplicacao;
  }

  function dividir(n1, n2) {

    const n1Convertido = parseFloat(n1);
    const n2Convertido = parseFloat(n2);
    if (n2Convertido === 0) {
      Alert.alert("Erro", "Divisão por zero não é permitida!");
      return null;
    }
    const divisao = n1Convertido / n2Convertido;
    return divisao;
  }

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <Text style={estilos.texto}>Número 1</Text>
      <TextInput style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum1}
        value={num1}
      />
      <Text style={estilos.texto} >Número 2</Text>
      <TextInput style={estilos.campo}
        placeholder="Digite um número"
        keyboardType="numeric"
        onChangeText={setNum2}
        value={num2}
      />
      <View style={estilos.botoes}>
        <Button title=" + " onPress={() => setResultado(somar(num1, num2))} />
        <Button title=" - " onPress={() => setResultado(subtrair(num1, num2))} />
        <Button title=" * " onPress={() => setResultado(multiplicar(num1, num2))} />
        <Button title=" / " onPress={() => setResultado(dividir(num1, num2))} />
      </View>
      <Text style={estilos.resultado}>Resultado: {resultado}</Text>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({

  areaSegura: {
    flex: 1,
  },

  texto: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20
  },

  campo: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 50
  },

  resultado: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 20
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  }

});
