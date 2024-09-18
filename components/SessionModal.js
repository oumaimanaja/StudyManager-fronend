import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const SessionModal = ({ visible, onOptionSelect }) => {
  const handleOptionPress = (option) => {
    onOptionSelect(option); // Appelle la fonction passée en prop avec l'option sélectionnée
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => handleOptionPress("cancel")} // Ferme la modale si l'utilisateur appuie en dehors
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Session expirée</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOptionPress("startNow")}
          >
            <Text style={styles.buttonText}>Commencer maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOptionPress("rescheduleLater")}
          >
            <Text style={styles.buttonText}>Replanifier pour plus tard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOptionPress("cancel")}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalContent: {
    width: width * 0.8, // Largeur du modal
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#21005d",
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SessionModal;
