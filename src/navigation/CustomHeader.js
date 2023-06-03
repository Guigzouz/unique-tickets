import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isEventSeenScreen = route.name === 'EventSeen';
  const [menuVisible, setMenuVisible] = useState(false);
  const [ticketSelected, setTicketSelected] = useState(false);

  const openMenu = () => {
    if (ticketSelected) {
      setMenuVisible(true);
    } else {
      Alert.alert("Aucun ticket n'a été sélectionné");
    }
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleMenuOption = (option) => {
    console.log('Selected option:', option);
    // Vérifier si des tickets ont été sélectionnés dans la page EventSeen
    if (route.name === 'EventSeen' && Object.keys(selectedCounts).length === 0) {
      Alert.alert(
        'Aucun ticket sélectionné',
        'Veuillez sélectionner au moins un ticket avant de continuer.',
        [
          { text: 'OK' }
        ]
      );
      return;
    }
  
    // Ajoutez le reste de votre logique pour chaque option de menu ici
  };
  

  const handleTicketSelection = () => {
    // Logique pour la sélection du ticket
    setTicketSelected(true);
  };

  if (navigation && navigation.canGoBack()) {
    return (
      <View style={styles.goBackHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
          <Icon name="arrow-back" size={30} color={Colors.primaryPurple} />
        </TouchableOpacity>
        <Image style={styles.image} source={require('../../assets/logo/logo.png')} />
        {isEventSeenScreen && (
          <TouchableOpacity onPress={openMenu} style={styles.Modal}>
            <Icon name="menu" size={30} color={Colors.primaryPurple} />
          </TouchableOpacity>
        )}

        <Modal visible={menuVisible} animationType="slide" transparent={true}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOption('Revendre Billet(s)')}>
              <Text style={styles.menuText}>Revendre Billet(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOption('Transferer Billet(s)')}>
              <Text style={styles.menuText}>Transferer Billet(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleMenuOption('Imprimer Billet(s)')}>
              <Text style={styles.menuText}>Imprimer Billet(s)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('../../assets/logo/logo.png')} />
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
  arrow: {
    width: '43%',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryPurple,
  },
  menuText: {
    fontSize: 18,
    color: Colors.primaryPurple,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: Colors.primaryPurple,
  },
  Modal:{
    width: '44%',
    alignItems: 'flex-end'
  }
});
