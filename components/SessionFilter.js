import React, { useState } from "react";
import { View } from "react-native";
import { SpeedDial } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SessionFilter = ({ sessionsInProgress, sessionsCompleted, sessionsMissed, sessionsAbandoned }) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const HandleShowDashboard = () => {
    navigation.navigate("PomodoroDashboardScreen", { 
      sessionsInProgress, 
      sessionsCompleted, 
      sessionsMissed,
      sessionsAbandoned  
    });
    setOpen(!open);
  };

  const HandleShowFuturSession = () => {
    navigation.navigate("FilterSessionScreen", { status: "Planifiée" });
    setOpen(!open);
  };

  const HandleShowInProgresSession = () => {
    navigation.navigate("FilterSessionScreen", { status: "En cours" });
    setOpen(!open);
  };

  const HandleShowCompletedSession = () => {
    navigation.navigate("FilterSessionScreen", { status: "Terminée" });
    setOpen(!open);
  };

  const HandleShowMissedSession = () => {
    navigation.navigate("FilterSessionScreen", { status: "Manquée" });
    setOpen(!open);
  };
  const HandleShowAbandonedSession = () => {
    navigation.navigate("FilterSessionScreen", { status: "Abandonnée" });
    setOpen(!open);
  };
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "filter-alt", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      color="#21005d"
      size="small"
    >
      <SpeedDial.Action
        icon={{ name: "calendar", color: "#fff", type: "font-awesome" }}
        title="Sessions planifiées"
        onPress={HandleShowFuturSession}
        color="#21005d"
      />
      <SpeedDial.Action
        icon={{ name: "play-circle", color: "#FFECB3", type: "font-awesome" }}
        title="Sessions en cours"
        onPress={HandleShowInProgresSession}
        color="#21005d"
      />
      <SpeedDial.Action
        icon={{ name: "check-circle", color: "#c2f0c2", type: "font-awesome" }}
        title="Sessions terminées"
        onPress={HandleShowCompletedSession}
        color="#21005d"
      />
      <SpeedDial.Action
        icon={{ name: "times-circle", color: "#ffdddd", type: "font-awesome" }}
        title="Sessions manquées"
        onPress={HandleShowMissedSession}
        color="#21005d"
      />
      <SpeedDial.Action
        icon={{ name: "coffee", color: "#A9A9A9", type: "font-awesome" }}
        title="Sessions abandonnées"
        onPress={() => HandleShowAbandonedSession()}
        color="#21005d"
      />
      <SpeedDial.Action
        icon={{ name: "line-chart", color: "#fff", type: "font-awesome" }} 
        title="Dashboard"
        onPress={HandleShowDashboard}
        color="#21005d"
      />
    </SpeedDial>
  );
};

export default SessionFilter;
