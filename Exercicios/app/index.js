import { useState } from "react";
import { Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={estilos.telaInicial}>
      <Text style={{ fontSize: 18 }}>Seja bem-vindo!</Text>

      <Link href="/exercicio" asChild>
        <Button title="Ver exercícios" />
      </Link>
    </SafeAreaView>
  );


}

 const estilos = StyleSheet.create({
    telaInicial: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12
    },

    titulo: {
      fontSize: 18
    }
  });