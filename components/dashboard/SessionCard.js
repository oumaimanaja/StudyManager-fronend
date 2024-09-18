import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';

const SessionCard = ({ title, value }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={title} titleStyle={styles.cardTitle} />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.cardText}>{value}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 30,
    minHeight: 40,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});

export default SessionCard;
