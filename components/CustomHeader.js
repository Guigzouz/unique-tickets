import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { Colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  if (navigation && navigation.canGoBack()) {
    return (
      <View style={styles.goBackHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
          <Icon name="arrow-back" size={30} color={Colors.primaryPurple} />
        </TouchableOpacity>
        <Image style={styles.image} source={require('../assets/logo/logo.png')} />
      </View>
    );
  }
  
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('../assets/logo/logo.png')} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryDark,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryPurple,
    paddingBottom: 15,
  },
  goBackHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    height: 120,
    alignItems: 'flex-end',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryPurple,
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
  },
  arrow:{
    width: '43%'
  }
});
