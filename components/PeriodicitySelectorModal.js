import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../reducers/themeSlice";

const { width, height } = Dimensions.get("window");

const PeriodicitySelectorModal = ({
  visible,
  onClose,
  onPeriodicitySelect,
  selectedPeriodicity,
}) => {
  const theme = useSelector(selectCurrentTheme); // Récupération du thème actuel

  const periodicities = [
    "Quotidienne",
    "Hebdomadaire",
    "Mensuelle",
    "Annuelle",
  ];

  return (
    <SafeAreaView>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.secondaryBackgroundColor }]}>
            <View style={styles.contentContainer}>
              <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                Sélectionnez la périodicité
              </Text>
              {periodicities.map((periodicity) => (
                <TouchableOpacity
                  key={periodicity}
                  style={[
                    styles.modalButton,
                    { backgroundColor: theme.buttonColor }, // Appliquer la couleur des boutons "Annuler" et "Enregistrer"
                    selectedPeriodicity === periodicity && {
                      backgroundColor: theme.buttonColor + "CC", // Option sélectionnée avec une teinte légèrement différente
                    },
                  ]}
                  onPress={() => onPeriodicitySelect(periodicity)}
                >
                  <Text style={[styles.modalButtonText, { color: theme.buttonTextColor }]}>
                    {periodicity}
                  </Text>
                </TouchableOpacity>
              ))}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.buttonColor }]}
                  onPress={onClose}
                >
                  <Text style={[styles.actionButtonText, { color: theme.buttonTextColor }]}>
                    Annuler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: theme.buttonColor }]}
                  onPress={onClose}
                >
                  <Text style={[styles.actionButtonText, { color: theme.buttonTextColor }]}>
                    Enregistrer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Positionne la modal en bas de l'écran
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: width * 0.05,
    borderTopRightRadius: width * 0.05,
    padding: width * 0.05,
    width: width, // Occupe toute la largeur de l'écran
    height: height * 0.7, // Occupe 70% de la hauteur de l'écran
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between", // Répartit l'espace entre les éléments
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    fontSize: width * 0.05, // Taille de la police en fonction de la largeur de l'écran
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  modalButton: {
    padding: height * 0.02, // Padding basé sur la hauteur de l'écran
    borderRadius: width * 0.03, // Rayon des bords basé sur la largeur de l'écran
    alignItems: "center",
    width: "80%", // Réduire la largeur des boutons à 80% de la largeur de la modal
    maxWidth: 250, // Ou définir une largeur maximale fixe
    alignSelf: "center", // Centrer le bouton horizontalement
    marginBottom: height * 0.01,
  },
  modalButtonText: {
    fontSize: width * 0.04, // Taille de la police basée sur la largeur de l'écran
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.03, // Marge en haut basée sur la hauteur de l'écran
    width: "100%",
  },
  actionButton: {
    padding: height * 0.02, // Padding basé sur la hauteur de l'écran
    borderRadius: width * 0.03, // Rayon des bords basé sur la largeur de l'écran
    alignItems: "center",
    flex: 1,
    marginHorizontal: width * 0.02, // Marge horizontale basée sur la largeur de l'écran
  },
  actionButtonText: {
    fontSize: width * 0.04, // Taille de la police basée sur la largeur de l'écran
    fontWeight: "bold",
  },
  selectedOption: {
    backgroundColor: "#21005D33", // Couleur semi-transparente lorsque l'option est sélectionnée
  },
});

export default PeriodicitySelectorModal;
