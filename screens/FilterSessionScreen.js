import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import HeaderBackButton from "../components/HeaderBackButton";
import SessionCard from "../components/SessionCard";
import SessionFilter from "../components/SessionFilter";
import { formatDate } from "../modules/formatDate";

const FilterSessionScreen = ({ navigation, route }) => {
  const { status } = route.params || {}; // Status passed from navigation
  const userId = useSelector((state) => state.user.value.userId);

  const [sessions, setSessions] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const token = useSelector((state) => state.user.value.token);

  useEffect(() => {
    fetch(`${apiUrl}/sessions/user-sessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSessions(data.sessions);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, [refreshFlag]);

  // Filter sessions by the status passed through route.params
  const filteredSessions = sessions.filter((session) => session.status === status);

  const handleDelete = (sessionId) => {
    setRefreshFlag((prev) => !prev);
  };

  const markSessionInProgress = (session_id) => {
    fetch(`${apiUrl}/sessions/markasInProgress/${session_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setRefreshFlag((prev) => !prev); // Force rerender after marking as in progress
      })
      .catch((error) => {
        console.error("Error marking session done:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackButton />
      <View style={styles.line} />
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filteredSessions.length === 0 ? (
          <Text>Aucune session pour le statut sélectionné.</Text>
        ) : (
          filteredSessions.map((session, index) => (
            <View key={session.id || index} style={styles.cardWrapper}>
              <SessionCard
                session_id={session._id}
                status={session.status}
                title={session.title}
                date={formatDate(session.selectedDate)}
                startTime={new Date(session.startTime).toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                endTime={new Date(session.endTime).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                description={session.description}
                onEdit={() =>
                  navigation.navigate("CreateSessionScreen", { session })
                }
                onDelete={handleDelete}
                onStart={() => {
                  markSessionInProgress(session._id);
                  navigation.navigate("PomodoroScreen", {
                    fromMenu: false,
                    numberOfCycles: session.numberOfCycles,
                    workDuration: session.workDuration,
                    breakDuration: session.breakDuration,
                    SessionProps: {
                      session_id: session._id,
                      status: "En cours",
                      title: session.title,
                      startTime: `${session.startTime}`,
                      endTime: `${session.endTime}`,
                      description: session.description,
                    },
                  });
                }}
                showButton={true}
              />
            </View>
          ))
        )}
      </ScrollView>
      <SessionFilter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  cardsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  line: {
    marginBottom: 5,
    width: "100%",
    height: 2,
    backgroundColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default FilterSessionScreen;