import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { sliceText } from "../modules/sliceText";

const CardHeader2 = ({ props, onEdit }) => {
  // Conditionne l'affichage du bouton d'édition
  const hideButton = !(
    props.status == "Terminée" ||
    props.status == "En cours" ||
    props.status == "Manquée" ||
    props.status == "Abandonnée"
  );

  // Détermine la couleur de l'icône
  const iconColor = "white";

  // Détermine le style du statut en fonction de son état
  const statusStyle = (() => {
    switch (props.status) {
      case "Terminée":
        return [styles.status, styles.statusTerminee];
      case "En cours":
        return [styles.status, styles.statusEnCours];
      case "Manquée":
        return [styles.status, styles.statusManquee];
      case "Planifiée":
        return [styles.status, styles.statusPlanifiee];
      case "Abandonnée":
        return [styles.status, styles.statusAbandonnee];
      default:
        return styles.status;
    }
  })();

  // Détermine la couleur du texte en fonction du statut
  const statusTextColor = (() => {
    switch (props.status) {
      case "Planifiée":
      case "Manquée":
      case "Abandonnée":
        return styles.statusTextWhite;
      case "Terminée":
        return styles.statusTextGreen;
      default:
        return styles.statusTextGrey;
    }
  })();

  return (
    <View style={styles.header}>
      <View style={styles.TitleContainer}>
        <View style={statusStyle}>
          <Text style={[styles.statusText, statusTextColor]}>
            {props.status}
          </Text>
        </View>

        <Text
          style={
            props.status === "Terminée" ||
            props.status === "En cours" ||
            props.status === "Abandonnée" ||
            props.status === "Manquée"
              ? styles.inactiveTitle
              : styles.activeTitle
          }
        >
          {sliceText(props.title, 25)}
        </Text>
      </View>
      {hideButton && (
        <TouchableOpacity onPress={onEdit} style={styles.iconContainer}>
          <FontAwesome name="pencil" size={12} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    borderWidth: 1, // Épaisseur de la bordure
    borderRadius: 30, // Rayon des coins arrondis
    paddingVertical: 0, // Espacement vertical à l'intérieur du cadre
    paddingHorizontal: 3, // Espacement horizontal à l'intérieur du cadre
    alignSelf: "flex-start",
    marginRight: 10,
  },
  statusText: {
    fontSize: 10,
    // fontWeight: "bold",
    alignSelf: "flex-start",
    margin: 5,
  },
  statusTextWhite: {
    color: "white", // Couleur du texte pour Planifiée et Manquée
  },
  statusTextGrey: {
    color: "grey", // Couleur du texte pour En cours et Terminée
  },
  statusTextGreen: {
    color: "green", // Couleur du texte pour En cours et Terminée
  },
  statusTerminee: {
    backgroundColor: "#E0F8E0", // Gris clair pour "Terminée"
    borderColor: "#E0F8E0", // Gris clair pour la bordure
  },
  statusEnCours: {
    backgroundColor: "#FFD700", // Jaune pour "En cours"
    borderColor: "#FFD700", // Jaune pour la bordure
  },
  statusManquee: {
    backgroundColor: "#ec6e5b", // Rouge pour "Manquée"
    borderColor: "#ec6e5b", // Rouge pour la bordure
  },
  statusPlanifiee: {
    backgroundColor: "#21005d", // Noir pour "Planifiée"
    borderColor: "black", // Noir pour la bordure
  },
  statusAbandonnee: {
    backgroundColor: "#A9A9A9",
    borderColor: "#A9A9A9",
  },
  activeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  inactiveTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  TitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    width: 17,
    height: 17,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21005d",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default CardHeader2;
