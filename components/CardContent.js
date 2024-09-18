import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { sliceText } from "../modules/sliceText";

const CardContent = ({ props }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardContent}>
      <Text style={styles.time}>
        {props.startTime} ▶ {props.endTime}
      </Text>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.detailsContainer}
        >
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
              {sliceText(props.description, 35)}
            </Text>

            <FontAwesome name="paperclip" size={18} color="#21005d" />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.fullDescription}>{props.description}</Text>
            <Button
              style={styles.button}
              title="Fermer"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  contentContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 5,
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: "#777",
    flex: 1,
  },
  time: {
    fontSize: 10,
    color: "#555",
    marginRight: 5,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    elevation: 5,
  },
  fullDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
});

export default CardContent;
