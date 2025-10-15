import { View, Text, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.header}>
        <Text style={estilos.titulo}> Bem-vindo!</Text>
        <Text style={estilos.subtitulo}>
          Gerencie seu catálogo pessoal de filmes
        </Text>
      </View>

      <View style={estilos.botaoContainer}>
        <Link href="/filmes" asChild>
          <Button title=" Acessar filmes" color="#4CAF50" />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  botaoContainer: {
    width: "80%",
    marginTop: 20,
  },
});