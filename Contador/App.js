import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  var [contador, setContador] = useState(0);

  return (
    <SafeAreaView style={estilos.areaSegura}>
      <Button title='Adicionar 1' onPress={() => setContador(contador + 1)}></Button>
      <Button title='Diminuir 1' onPress={() => setContador(contador - 1)}></Button>
      <Button title='Zerar contador' onPress={() => setContador(contador = 0)}></Button>
      <Text style={{ fontSize: 40 }}>Contador: {contador}</Text>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({

  areaSegura: {
    flex: 1,
  }
});