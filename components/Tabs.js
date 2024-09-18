import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Tabs = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === 'past' ? styles.activeTab : styles.inactiveTab,
        { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
      ]}
      onPress={() => setActiveTab('past')}
    >
      <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
        Sessions passées
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === 'upcoming' ? styles.activeTab : styles.inactiveTab,
      ]}
      onPress={() => setActiveTab('upcoming')}
    >
      <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
        Sessions à venir
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === 'all' ? styles.activeTab : styles.inactiveTab, 
        { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
      ]}
      onPress={() => setActiveTab('all')}
    >
      <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
        Toutes les sessions
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#21005d',
  },
  inactiveTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#21005d',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
};

export default Tabs;
