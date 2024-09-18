import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HeaderButtons from '../components/HeaderBackButton';
import DashboardTitle from '../components/dashboard/DashboardTitle';
import SessionRow from '../components/dashboard/SessionRow';
import SessionsChart from '../components/dashboard/SessionsChart';

const PomodoroDashboardScreen = ({ route }) => {
  const { sessionsInProgress, sessionsCompleted, sessionsMissed, sessionsAbandoned } = route.params;

  const chartData = {
    labels: ['En cours', 'Terminées', 'Manquées', 'Abandonnées'],
    datasets: [
      {
        data: [sessionsInProgress, sessionsCompleted, sessionsMissed, sessionsAbandoned],
        color: () => '#8884d8',
        strokeWidth: 2,
      },
    ],
    legend: ['Sessions'],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderButtons />
      <ScrollView style={styles.container}>
        <DashboardTitle />
        <SessionRow data={[
          { title: 'En cours', value: sessionsInProgress },
          { title: 'Terminées', value: sessionsCompleted },
        ]} />
        <SessionRow data={[
          { title: 'Manquées', value: sessionsMissed },
          { title: 'Abandonnées', value: sessionsAbandoned },
        ]} />
        <SessionsChart chartData={chartData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default PomodoroDashboardScreen;
