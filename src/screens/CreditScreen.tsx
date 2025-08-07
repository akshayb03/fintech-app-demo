import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';

const CreditScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Credit Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light1,
  },
});

export default CreditScreen;
