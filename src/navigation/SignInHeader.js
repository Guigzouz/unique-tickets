import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { globalStyles } from '../styles/global'
import { Colors } from '../styles/colors'


const CustomHeader = () => {
    return (
      <View style={styles.header}>
      <Image style={styles.image} source= {require('../assets/logo/logo.png')}></Image>
      </View>
    );
  };

export default CustomHeader

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryDark,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryPurple,
    paddingBottom: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    width: 50,
    height: 50
  }
});
