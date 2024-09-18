import FontAwesome from "react-native-vector-icons/FontAwesome";
import PomodoroScreen from "./screens/PomodoroScreen";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignupScreen";
import CreateSessionScreen from "./screens/CreateSessionScreen";
import ProfileScreen from "./screens/ProfilScreen";
import SessionScreen from "./screens/SessionScreen";
import PomodoroDashboardScreen from "./screens/PomodoroDashboardScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import sessionReducer from "./reducers/createSession";
import themeReducer, { selectCurrentTheme } from "./reducers/themeSlice"; //ajouté pour le theme
import SettingsScreen from "./screens/SettingsScreen";
import FilterSessionScreen from "./screens/FilterSessionScreen";
import { login } from "./reducers/user";

const store = configureStore({
  reducer: { user: userReducer, session: sessionReducer, theme: themeReducer }, //ajouté pour le theme
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const theme = useSelector(selectCurrentTheme); //ajouté pour le theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Mes Sessions") {
            iconName = "list";
          } else if (route.name === "Pomodoro") {
            iconName = "clock-o";
          } else if (route.name === "Ajouter une session") {
            iconName = "plus";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ec6e5b",
        // tabBarInactiveTintColor: "#21005D",
        tabBarInactiveTintColor: theme.buttonColor, //ajouté pour le theme
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.backgroundColor }, //ajouté pour le theme
      })}
    >
      <Tab.Screen name="Mes Sessions" component={HomeScreen} />
      <Tab.Screen
        name="Pomodoro"
        component={PomodoroScreen}
        initialParams={{ fromMenu: true }} // Passer fromMenu comme true
      />
      <Tab.Screen name="Ajouter une session" component={CreateSessionScreen} />
    </Tab.Navigator>
  );
};

const ThemedNavigator = () => {
  const theme = useSelector(selectCurrentTheme);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.backgroundColor } }}>
      <Stack.Screen name="SigninScreen" component={SignInScreen} />
      <Stack.Screen name="SignupScreen" component={SignUpScreen} />
      <Stack.Screen name="ProfilScreen" component={ProfileScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PomodoroScreen" component={PomodoroScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="SessionScreen" component={SessionScreen} />
      <Stack.Screen name="PomodoroDashboardScreen" component={PomodoroDashboardScreen} />

      <Stack.Screen
        name="FilterSessionScreen"
        component={FilterSessionScreen}
      />
      <Stack.Screen
        name="CreateSessionScreen"
        component={CreateSessionScreen}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemedNavigator />
      </NavigationContainer>
    </Provider>
  );
};
