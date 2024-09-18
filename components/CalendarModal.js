import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../reducers/themeSlice";

const CalendarModal = ({ selectedDate, onSelectDate, visible, onClose }) => {
  // Récupération du thème courant
  const theme = useSelector(selectCurrentTheme);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme.secondaryBackgroundColor }]}>
          <Text style={[styles.modalTitle, { color: theme.textColor }]}>Sélectionnez une date</Text>
          <Calendar
            onDayPress={(day) => {
              const selectedDate = new Date(day.dateString);
              onSelectDate(selectedDate);
              onClose();
            }}
            markedDates={{
              [selectedDate.toISOString().split("T")[0]]: {
                selected: true,
                selectedColor: theme.buttonColor, // Couleur du jour sélectionné
              },
            }}
            theme={{
              backgroundColor: theme.backgroundColor,
              calendarBackground: theme.secondaryBackgroundColor, // Fond du calendrier
              textSectionTitleColor: theme.textColor, // Couleur des titres des sections (jours de la semaine)
              selectedDayBackgroundColor: theme.buttonColor, // Fond du jour sélectionné
              selectedDayTextColor: theme.buttonTextColor, // Texte du jour sélectionné
              todayTextColor: theme.buttonColor, // Couleur du texte du jour actuel
              dayTextColor: theme.textColor, // Couleur du texte des jours normaux
              monthTextColor: theme.textColor, // Couleur du texte pour le mois
              arrowColor: theme.buttonColor, // Couleur des flèches du calendrier
              textDisabledColor: '#666', // Couleur des jours désactivés
            }}
            locale={"fr"}
          />
          <TouchableOpacity onPress={onClose} style={[styles.closeButton, { borderColor: theme.buttonColor }]}>
            <Text style={[styles.closeButtonText, { color: theme.buttonColor }]}>Annuler</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});

export default CalendarModal;
