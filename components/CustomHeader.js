import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>CustomHeader</Text>
      </View>
    );
  };

export default CustomHeader

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DC143C',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
