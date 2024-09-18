import React from 'react';
import { View, StyleSheet } from 'react-native';
import SessionCard from './SessionCard';

const SessionRow = ({ data }) => {
  return (
    <View style={styles.row}>
      {data.map((session, index) => (
        <SessionCard key={index} title={session.title} value={session.value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default SessionRow;
