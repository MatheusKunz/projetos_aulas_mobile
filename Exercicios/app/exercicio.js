import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";
import { TextInput } from "react-native";
import { FlatList } from "react-native";
import { router } from "expo-router";

initDb();

function getExercicios() {
    return db.getAllSync('SELECT * FROM exercicios');
}

function insertExercicio(descricao) {
    db.runSync('INSERT INTO exercicios (descricao) VALUES (?)', [descricao]);
};

function deleteExercicio(id) {
    db.runSync('DELETE FROM exercicios WHERE id = ?', [id]);
};

export default function sqlite() {
    const [texto, setTexto] = useState("");
    const [exercicios, setExercicios] = useState([]);


    function salvarExercicio() {
        const descricao = texto.trim();
        if (!descricao) return;
        insertExercicio(descricao);
        carregarExercicios();
        setTexto("");
    }

    function carregarExercicios() {
        setExercicios(getExercicios());
    }

    function excluirExercicio(id) {
        deleteExercicio(id);
        carregarExercicios();
    }


    return (
        <SafeAreaView style={estilos.container}>
            <Text style={estilos.texto}>Exercicios</Text>
            <View style={estilos.linhaEntrada}>
                <TextInput
                    value={texto}
                    onChangeText={setTexto}
                    placeholder="Descrição do exercício"
                    style={estilos.campoTexto}
                />
                        <TextInput
                    value={texto}
                    onChangeText={setTexto}
                    placeholder="Descrição do exercício"
                    style={estilos.campoTexto}
                />
                        <TextInput
                    value={texto}
                    onChangeText={setTexto}
                    placeholder="Descrição do exercício"
                    style={estilos.campoTexto}
                />
                <Button title="Salvar" onPress={salvarExercicio} />
            </View>
            <Button title="Carregar exercícios" onPress={carregarExercicios} />
            <FlatList
                data={exercicios}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={estilos.itemLinha}>
                        <Text style={estilos.textoItem}>- {item.descricao}</Text>
                        <Button title="Excluir" onPress={() => excluirExercicio(item.id)} />
                    </View>
                )}

            />

            <View style={estilos.rodape}>
                <Button title="Voltar" onPress={() => router.back()} />
                <Button title="Ir para Home" onPress={() => router.replace('/')} />
                
            </View>

        </SafeAreaView>
    );


}
const estilos = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        padding: 12,
    },

    texto: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    },

    linhaEntrada: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        marginBottom: 8,
        gap: 8
    },

    campoTexto: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },

    itemLinha: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
    },

    textoItem: {
        fontSize: 16,
        paddingVertical: 6,
    },

    rodape: {
        flexDirection: "row",
        gap: 8,
        marginTop: 8,
    }
});