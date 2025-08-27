import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      {/* Cabeçalho */}
      <Text style={estilos.titulo}>React Native</Text>
      <Text style={estilos.subTitulo}>Avaliação dia 27/08</Text>
      {/* Corpo */}
      <View style={estilos.centralizado}>
        <View style={estilos.retangulo}>
          <Text style={estilos.textoRetangulo}>Batatas são macias.</Text>
        </View>
        {/* Botão */}
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    marginTop: 35,
    margin: 20,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold"
  },

  subTitulo: {
    fontSize: 16,
    opacity: 0.5
  },

  retangulo: {
    height: 50,
    width: 180,
    backgroundColor: "#e7e7e7ff",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#c5c5c5ff",
    alignItems: "center",
    justifyContent: "center"
  },

  textoRetangulo: {
    fontSize: 16,
    fontWeight: "bold",
  },

  centralizado: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 330,
    gap: 20
  },

  botao: {
    height: 50,
    width: 100,
    backgroundColor: "#2e68e6ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },

  textoBotao: {
    fontSize: 16,
    color: "white",
  }
})