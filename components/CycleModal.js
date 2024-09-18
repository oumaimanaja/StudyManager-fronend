import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";

console.disableYellowBox = true;

const CycleModal = ({ visible, onClose, onSubmit }) => {
  const [cycles, setCycles] = useState(1); // Slider starts at 1

  const handleSubmit = () => {
    onSubmit(cycles);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Choisissez le nombre de Pomodoro de 30 minutes à lancer
          </Text>
          <View style={styles.cycleIconsContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="clock-o"
                size={30}
                color={index < cycles ? "#FF6347" : "#D3D3D3"} // Color based on selected cycles
                style={styles.cycleIcon}
              />
            ))}
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={cycles}
            onValueChange={setCycles}
            minimumTrackTintColor="#FF6347"
            maximumTrackTintColor="#000000"
            // thumbTintColor="transparent" // Make the original thumb invisible
            renderThumbComponent={() => (
              <View style={styles.thumbIcon}>
                <Icon name="clock-o" size={20} color="#FF6347" />
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.backIconButton}
            >
              <Icon name="check" size={20} color="white" />
              {/* Icône "OK" */}
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.backIconButton}>
              <Icon name="times" size={20} color="white" />
              {/* Icône "Annuler" */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cycleCount: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF6347",
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 20,
  },
  cycleIconsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  cycleIcon: {
    marginHorizontal: 5,
  },
  thumbIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxWidth: 250,
    marginBottom: 30,
  },
  backIconButton: {
    marginTop: 0,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#21005D", // Couleur de fond du bouton
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginHorizontal: 20, // Espacement horizontal entre les boutons
  },
});

export default CycleModal;
