import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { selectCurrentTheme } from "../reducers/themeSlice"; // Sélection du thème depuis Redux

const HeaderBackButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Utiliser dispatch

  // Récupération du thème courant depuis Redux
  const theme = useSelector(selectCurrentTheme);

  function HandleLogout() {
    dispatch(logout());
    navigation.navigate("SigninScreen");
  }
  return (
    <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
      {/* Icône de liste à gauche */}
      <TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator", { screen: "Mes Sessions"})}
        style={styles.leftIcon}
      >
        <FontAwesome name="arrow-left" size={24} color={theme.buttonColor} />
      </TouchableOpacity>

      {/* Espace flexible pour pousser les icônes à droite */}
      <View style={styles.spacer} />

      {/* Icônes utilisateur et déconnexion à droite */}
      <View style={styles.headerRightIcons}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingsScreen")}
          style={[styles.icon, { borderColor: theme.buttonColor }]}
        >
          <FontAwesome name="gear" size={24} color={theme.buttonColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => HandleLogout()}
          style={[styles.iconBackground, { backgroundColor: theme.buttonColor }]}
        >
          <FontAwesome name="power-off" size={24} color={theme.buttonTextColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF", // Fond par défaut, sera remplacé par le thème
  },
  leftIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  spacer: {
    flex: 1, // Espace flexible pour pousser les icônes à droite
  },
  headerRightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconBackground: {
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default HeaderBackButton;
