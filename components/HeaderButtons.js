import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { selectCurrentTheme } from "../reducers/themeSlice"; // Sélection du thème depuis Redux

const HeaderButtons = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Récupération du thème courant depuis Redux
  const theme = useSelector(selectCurrentTheme);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <View style={[styles.header, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
            style={[styles.icon, { borderColor: theme.buttonColor }]}
          >
            <FontAwesome name="gear" size={24} color={theme.buttonColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => HandleLogout()}>
            <View style={[styles.iconBackground, { backgroundColor: theme.buttonColor }]}>
              <FontAwesome name="power-off" size={24} color={theme.buttonTextColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Sélectionnez une date
            </Text>
            <Calendar
              onDayPress={(day) => {
                const selectedDate = new Date(day.dateString);
                setSelectedDate(selectedDate);
                closeModal();
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
            />

            <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { borderColor: theme.buttonColor }]}>
              <Text style={[styles.closeButtonText, { color: theme.buttonColor }]}>
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  headerRightIcons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 16,
    borderRadius: 20,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderWidth: 1,
    borderRadius: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});

export default HeaderButtons;
