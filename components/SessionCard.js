import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CardContent from "./CardContent";
import SessionButton from "./SessionButton";
import SessionModal from "./SessionModal";
import CardHeader from "./CardHeader";

const { width } = Dimensions.get("window");

const SessionCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const cardStyle = (() => {
    switch (props.status) {
      case "Terminée":
        return styles.cardDone;
      case "Manquée":
        return styles.cardMissed;
      case "Planifiée":
        return styles.card;
      case "En cours":
        return styles.cardInProgress;
      case "Abandonnée":
        return styles.cardAbandonned;
      default:
        return styles.card;
    }
  })();

  const openModal = () => {
    if (props.status === "Manquée" || props.status === "Abandonnée") {
      setModalVisible(true);
    }
  };

  const handleModalOption = (option) => {
    setModalVisible(false);
    switch (option) {
      case "startNow":
        props.onStart();
        break;
      case "rescheduleLater":
        props.onEdit();
        break;
      case "cancel":
        // La modale sera fermée automatiquement par setModalVisible(false)
        break;
      default:
        break;
    }
  };

  function handleStart() {
    switch (props.status) {
      case "Manquée":
      case "Abandonnée":
        return openModal;

      default:
        return props.onStart;
    }
  }
  console.log(props.showButton);
  return (
    <View style={cardStyle}>
      <CardHeader props={props} onEdit={props.onEdit} />

      <CardContent props={props} />
      {props.showButton && (
        <SessionButton
          props={props}
          //onStart={openModal || props.onStart}
          onStart={handleStart()}
          onDelete={props.onDelete}
          session_id={props.session_id}
        />
      )}
      <SessionModal visible={modalVisible} onOptionSelect={handleModalOption} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  cardDone: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: "#c2f0c2", // Gris clair pour les sessions terminées
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  cardMissed: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: "#ffdddd",
    opacity: 0.7, // Rouge clair pour les sessions manquées
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  cardInProgress: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: "#FFECB3", // Vert clair pour les sessions en cours
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
  cardAbandonned: {
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: "#D3D3D3",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 15,
    alignSelf: "center",
  },
});

export default SessionCard;
