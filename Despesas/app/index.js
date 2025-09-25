import { Link } from "expo-router";
import { Button } from "react-native";
import { View } from "react-native";

export default function Index() {
    return (
        <View>
            <Link href="/despesas" asChild>
                <Button title='Despesas' />
            </Link>
        </View>
    )
}