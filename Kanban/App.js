import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Quadro de tarefas</Text>
        <Text style={estilos.subTitulo}>Kanban estático</Text>
      </View>
      <Text style={estilos.menu}>Quadro</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={estilos.grupoQuadros}>
          <View style={estilos.quadros}>
            <Text style={estilos.tituloQuadros}>A Fazer</Text>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Configurar ambiente</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Entregar layout (importante)</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Revisar textos</Text>
            </View>
          </View>
          <View style={estilos.quadros}>
            <Text style={estilos.tituloQuadros}>Em progresso</Text>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Tela inicial</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>API de login</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Documento</Text>
            </View>
          </View>
          <View style={estilos.quadros}>
            <Text style={estilos.tituloQuadros}>Concluído</Text>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Setup público</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>Comportamentos</Text>
            </View>
            <View style={estilos.colunas}>
              <Text style={estilos.textoColunas}>README</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={estilos.Botoes}>
        <TouchableOpacity style={estilos.botao1}>
          <Text style={estilos.textoBotao}>ADICIONAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao2}>
          <Text style={estilos.textoBotao}>FILTRAR</Text>
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

  cabecalho: {
    marginTop: 20,
    marginBottom: 30
  },

  titulo: {
    fontSize: 25,
    fontWeight: "bold"
  },

  subTitulo: {
    fontSize: 16,
    opacity: 0.5
  },

  menu: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15

  },

  quadros: {
    height: 580,
    width: 250,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    borderColor: "#e4e4e4ff",
    borderWidth: 2,
    alignItems: "center"
  },

  grupoQuadros: {
    flexDirection: "row",
    gap: 15
  },

  tituloQuadros: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },

  colunas: {
    width: "90%",
    height: 55,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e4e4e4ff",
    marginBottom: 8,
    justifyContent: "center"
  },

  textoColunas: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold"
  },

  Botoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 20
  },

  botao1: {
    flex: 1,
    backgroundColor: "#4d50fdff",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },

  botao2: {
    flex: 1,
    backgroundColor: "#818492ff",
    justifyContent: "center",
    borderRadius: 6,
    alignItems: "center",
    padding: 15
  },

  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }






})