import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigations/Navigation";
import StoreProvider from "./src/providers/storeProvider";
import { observer } from "mobx-react-lite";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const App = observer(() => {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tab" component={Navigation} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
});

export default App;
