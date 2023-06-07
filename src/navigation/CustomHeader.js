import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import useTicketStore from '../services/TicketStore';
import { auth, db } from '../../firebase';
import { query, collection, where, getDocs, limit } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';


const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isEventSeenScreen = route.name === 'EventSeen';

  const [menuVisible, setMenuVisible] = useState(false);
  const { selectedCounts, eventId } = useTicketStore();

  const confirmSellTickets = () => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir revendre les billets sélectionnés ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => sellTickets(),
        },
      ],
      { cancelable: false }
    );
  };

  const sellTickets = async () => {
    try {
      const ticketsRef = collection(db, 'tickets');
      const userId = auth.currentUser?.uid;
  
      const selectedTickets = Object.entries(selectedCounts);
  
      for (let i = 0; i < selectedTickets.length; i++) {
        const [category, count] = selectedTickets[i];
  
        const categoryQuery = query(
          ticketsRef,
          where('eventId', '==', eventId),
          where('userId', '==', userId),
          where('category', '==', category),
          limit(count) // Limite le nombre de documents à supprimer à "count"
        );
  
        const categorySnapshot = await getDocs(categoryQuery);
  
        categorySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      }
  
      setMenuVisible(false);
      navigation.goBack();
      Alert.alert('Succès', 'Vous pouvez rafraichir votre liste')
      console.log('Les tickets ont été supprimés avec succès.');

    } catch (error) {
      console.error('Erreur lors de la suppression des tickets :', error);
    }
  };
  

  
  const openMenu = () => {
    if (Object.keys(selectedCounts).length > 0) {
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
    if (option === 'Revendre Billet(s)') {
      confirmSellTickets();
    } else if (option === 'Transferer Billet(s)') {
      // Insérer la logique pour transférer les billets
    } else if (option === 'Imprimer Billet(s)') {
      // Insérer la logique pour imprimer les billets
    }
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
        <Image style={styles.imageResell} source={require('../../assets/logo/resell.png')} />
          </TouchableOpacity>
        )}

        <Modal visible={menuVisible} animationType="slide" transparent={true}>
          <View style={styles.menuContainer}>
            <View style={styles.menuOptions}>
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
  imageResell:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  arrow: {
    width: '42%',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuOptions: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryPurple,
    borderWidth: 1,
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondaryDark,
  },
  menuText: {
    fontSize: 18,
    color: Colors.primaryLight,
  },
  closeButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.primaryLight,
    fontFamily: 'Montserrat-Bold',
  },
  Modal: {
    width: '44%',
    alignItems: 'flex-end',
  },
});
