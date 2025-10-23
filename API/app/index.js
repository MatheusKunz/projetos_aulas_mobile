import { useState } from "react";
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 18 }}>Home (Hooks)</Text>
      <Text>Contagem: {count}</Text>
      <Button title="Somar +1" onPress={() => setCount((c) => c + 1)} />

      <Link href="/segunda" asChild>
        <Button title="Ir para a 2ª tela" />
      </Link>
      <Link href="/sqlite" asChild>
        <Button title="Ir para a 3ª tela" />
      </Link>
      <Link href="/CEP" asChild>
        <Button title="CEP" />
      </Link>
      <Link href="/api-sqlite" asChild>
        <Button title="API (código criado do sqlite)" />
      </Link>
      <Link href="/api" asChild>
        <Button title="APIs" />
      </Link>
    </View>
  );
}