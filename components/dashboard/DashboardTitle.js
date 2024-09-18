import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DashboardTitle = () => {
  return <Text style={styles.title}>Dashboard</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default DashboardTitle;
