import { ScrollView } from "react-native";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function App() {
  return (
    <View style={estilos.tela}>
      <View style={estilos.fotoPerfil}></View>
      <Text style={estilos.cabecalho}>Olá, estudante</Text>
      <Text style={estilos.mensagem}>Bem-vindo ao seu painel</Text>
      <Text style={estilos.tituloMenu}>Menu</Text>
      <View style={estilos.containerMenu}>
        <View style={estilos.menuNotas}>
          <Text style={estilos.textoNotas}>NOTAS</Text>
        </View>
        <View style={estilos.menuAulas}>
          <Text style={estilos.textoAulas}>AULAS</Text>
        </View>
        <View style={estilos.menuAvisos}>
          <Text style={estilos.textoAvisos}>AVISOS</Text>
        </View>
      </View>
      <Text style={estilos.tituloAtividades}>Próximas atividades</Text>
      <SafeAreaView style={estilos.telaSafeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={estilos.atividades}>
            <Text style={estilos.textoAtividades}>Trabalho de matemática</Text>
            <Text style={estilos.textoObservacao}>Entrega: 20/08</Text>
          </View>
          <View style={estilos.atividades}>
            <Text style={estilos.textoAtividades}>Prova de física (importante)</Text>
            <Text style={estilos.textoObservacao}>Data: 22/08</Text>
          </View>
          <View style={estilos.atividades}>
            <Text style={estilos.textoAtividades}>Leitura de história</Text>
            <Text style={estilos.textoObservacao}>Cap 3 e 4</Text>
          </View>
          <View style={estilos.atividades}>
            <Text style={estilos.textoAtividades}>Prova de português</Text>
            <Text style={estilos.textoObservacao}>Data: 24/09</Text>
          </View>
          <View style={estilos.atividades}>
            <Text style={estilos.textoAtividades}>Trabalho de geografia</Text>
            <Text style={estilos.textoObservacao}>Entrega: 19/09</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Text style={estilos.tituloFinal}>Chamada para ação</Text>
      <View style={estilos.campoComprar}>
        <Text style={estilos.textoComprar}>Adquira um novo curso e continue aprendendo!</Text>
        <View style={estilos.botaoComprar}>
          <Text style={estilos.textoBotao}>COMPRAR CURSO</Text>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({

  tela: {

    flex: 1,
    top: 35,
    padding: 20,
    backgroundColor: '#ffffffff',
    bottom: 35
  },

  telaSafeArea: {

    flex: 1,
    marginTop: 10,
    maxHeight: 280,
    justifyContent: "space-between"
  },

  cabecalho: {

    fontWeight: "800",
    fontSize: 30,
    marginTop: 20,
    marginLeft: 80,
  },

  mensagem: {

    fontSize: 20,
    opacity: 0.5,
    marginLeft: 80,
  },

  fotoPerfil: {

    position: 'absolute',
    left: 20,
    top: 40,
    width: 70,
    height: 70,
    backgroundColor: '#b6b3b3',
    borderRadius: 35,
  },

  tituloMenu: {

    fontWeight: "800",
    fontSize: 20,
    marginTop: 30,
  },

  containerMenu: {

    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,

  },
  menuNotas: {

    width: 110,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#1e59daff",
    justifyContent: "center",
    alignItems: "center"
  },

  textoNotas: {

    fontSize: 20,
    color: "white",
    fontWeight: 800
  },

  menuAulas: {

    width: 110,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#1cac1cff",
    justifyContent: "center",
    alignItems: "center"
  },

  textoAulas: {

    fontSize: 20,
    color: "white",
    fontWeight: 800
  },

  menuAvisos: {

    width: 110,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#9428d3ff",
    justifyContent: "center",
    alignItems: "center"
  },

  textoAvisos: {

    fontSize: 20,
    color: "white",
    fontWeight: 800
  },

  tituloAtividades: {

    fontWeight: "800",
    fontSize: 20,
    marginTop: 30,
  },

  atividades: {

    width: "100%",
    height: 80,
    backgroundColor: "#e7e6e6ff",
    borderWidth: 2,
    borderColor: "#a5a5a5ff",
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "space-between",
  },

  textoAtividades: {

    fontSize: 16,
    fontWeight: 800,
    marginLeft: 20,
    marginTop: 15,
  },

  textoObservacao: {

    fontSize: 16,
    opacity: 0.5,
    marginLeft: 20,
    marginBottom: 15,
  },

  tituloFinal: {

    marginTop: 10,
    fontWeight: "800",
    fontSize: 20,
  },

  campoComprar: {

    marginTop: 10,
    width: "100%",
    height: 160,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#cececeff",
    alignItems: "center"
  },

  textoComprar: {

    fontSize: 16,
    marginTop: 40
  },

  botaoComprar: {

    width: 150,
    height: 40,
    backgroundColor: "#d612c6ff",
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  textoBotao: {

    fontSize: 15,
    color: "white",
    fontWeight: 800,
  }


})
