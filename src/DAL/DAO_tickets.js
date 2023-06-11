import { auth, db } from '../../firebase';
import { query, collection, where, getDocs, limit } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { Alert } from 'react-native';


export async function addTicketToFirebase({ userId, eventId, ticketCategories, ticketCounts }) {
    try {
      
      for (const category in ticketCounts) {
        const count = ticketCounts[category];
        const categoryObj = ticketCategories.find((cat) => cat.categoryName === category);
        if (categoryObj && count > 0) {
          for (let i = 0; i < count; i++) {
            const ticket = {
              userId,
              eventId,
              category: categoryObj.categoryName,
              price: categoryObj.price,
            };
            await db.collection('tickets').add(ticket);
          }
        }
      }
      
      console.log('Tickets ajoutés avec succès !');
      console.log('ticketCounts :', ticketCounts);
      console.log('ticketCategories :', ticketCategories);
    } catch (error) {
      console.error('Erreur lors de l\'ajout des tickets :', error);
    }
  };

export async function sellTickets(eventId, selectedCounts, setMenuVisible, navigation){

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