import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Importation des icônes
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../reducers/themeSlice";

const ProgressBar = ({ totalCycles, completedCycles }) => {
  // Récupérer le thème actuel avec les couleurs depuis Redux
  const theme = useSelector(selectCurrentTheme);

  const focusColor = theme.buttonColor; // Couleur pour les cycles de focus (utilisation de la couleur principale du bouton)
  const breakColor = theme.buttonColor1; // Couleur pour les cycles de pause (utilisation de la couleur buttonColor1)
  const defaultColor = theme.buttonColor2; // Couleur par défaut pour les icônes non complétées

  const circles = [];

  for (let i = 0; i < totalCycles; i++) {
    const isCompleted = i < completedCycles;
    const isFocus = i % 2 === 0; // Alternance entre focus et pause

    circles.push(
      <Icon
        key={i}
        name={isFocus ? "clock-o" : "coffee"} // Icône sablier pour focus, tasse pour pause
        size={isFocus ? 30 : 25} // Taille plus grande pour focus, plus petite pour pause
        color={isCompleted ? (isFocus ? focusColor : breakColor) : defaultColor}
        style={styles.icon}
      />
    );
  }

  return <View style={styles.container}>{circles}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", // Permet au contenu de revenir à la ligne si nécessaire
    marginVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
    marginVertical: 5, // Ajoute de la marge verticale pour l'espacement des lignes
  },
});

export default ProgressBar;
