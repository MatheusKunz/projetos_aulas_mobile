Criar um novo documento:

npx create-expo-app@3.4.2 --example blank

Iniciar projeto no Expo:

npx expo start --tunnel

Instalar o SafeAreaView:

npx expo install react-native-safe-area-context

Instalar o Expo-Router:

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

Organizar as pastas como:

-app
--nome.js
--_layout.js
--index.js

Configurar o app.json

  "expo": {
    "plugins": ["expo-router"],
  "scheme": "your-app-scheme"
  }

Configurar o package.json

},
  "main": "expo-router/entry"
}

Instalar o SQLite

npx expo install expo-sqlite

Adicionar ao plugin do app.json

"expo-sqlite"

