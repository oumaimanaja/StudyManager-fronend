import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import NumericInput from "./Numeric-input";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../reducers/themeSlice";

const PomodoroParams = ({ visible, onClose, onSubmit }) => {
  const [cycles, setCycles] = useState(1);
  const [workDuration, setWorkDuration] = useState("25");
  const [breakDuration, setBreakDuration] = useState("5");

  const theme = useSelector(selectCurrentTheme); // Récupérer le thème actuel

  const handleSubmit = () => {
    const workMin = parseInt(workDuration, 10);
    const breakMin = parseInt(breakDuration, 10);
    onSubmit(cycles, workMin, breakMin);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.secondaryBackgroundColor },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.textColor }]}>
            Paramètres Pomodoro
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>
              Durée de travail (min) :
            </Text>
            {/* <TextInput
              style={[styles.input, { borderColor: theme.textColor, backgroundColor: theme.inputColor, color: theme.inputTextColor }]}
              keyboardType="numeric"
              placeholder="25"
              placeholderTextColor={theme.inputTextColor}
              value={workDuration}
              onChangeText={setWorkDuration}
            />  */}
          </View>
          <NumericInput
            min={1}
            max={120}
            step={5}
            initialValue={25}
            onValueChange={setWorkDuration} // Met à jour l'état de workDuration
          />

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textColor }]}>
              Durée de pause (min) :
            </Text>
            {/* <TextInput
              style={[styles.input, { borderColor: theme.textColor, backgroundColor: theme.inputColor, color: theme.inputTextColor }]}
              keyboardType="numeric"
              placeholder="5"
              placeholderTextColor={theme.inputTextColor}
              value={breakDuration}
              onChangeText={setBreakDuration}
            />  */}
          </View>
          <NumericInput
            min={1}
            max={120}
            step={1}
            initialValue={5}
            onValueChange={setBreakDuration} // Met à jour l'état de workDuration
          />
          <Text style={[styles.sliderLabel, { color: theme.textColor }]}>
            Choisissez le nombre de Pomodoro :
          </Text>
          <View style={styles.cycleIconsContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="clock-o"
                size={30}
                color={index < cycles ? theme.buttonColor1 : "#D3D3D3"} // Utiliser la couleur du thème pour les icônes actives, sinon couleur grise
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
            minimumTrackTintColor={theme.buttonColor}
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor={theme.buttonColor}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, { backgroundColor: theme.buttonColor }]}
            >
              <Icon name="check" size={20} color={theme.buttonTextColor} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.button,
                styles.cancelButton,
                { backgroundColor: theme.cancelButtonColor || "#FF6347" },
              ]}
            >
              <Icon name="times" size={20} color={theme.buttonTextColor} />
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
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  cancelButton: {
    backgroundColor: "#FF6347", // Cette couleur peut être remplacée par une couleur définie dans votre thème
  },
});

export default PomodoroParams;
