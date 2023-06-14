import { FieldPath, db } from '../../firebase';
import Fuse from 'fuse.js';


export async function fetchPreviousEvents(userId) {
  const ticketsSnapshot = await db
    .collection('tickets')
    .where('userId', '==', userId)
    .get();

  const tickets = ticketsSnapshot.docs.map((doc) => doc.data());
  const eventIds = tickets.map((ticket) => ticket.eventId);

  if (eventIds.length === 0) {
    // si pas d'event, gerer le scenario ici
    return [];
  }

  const eventsSnapshot = await db
    .collection('events')
    .where(FieldPath.documentId(), 'in', eventIds)
    .get();

  const events = eventsSnapshot.docs.map((doc) => {
    const eventId = doc.id;
    const eventTicket = tickets.filter((ticket) => ticket.eventId === eventId);
    const category = eventTicket[0].category;
    const price = eventTicket[0].price;

    return {
      id: eventId,
      category,
      price,
      count: eventTicket.length,
      tickets: eventTicket,
      ...doc.data(),
    };
  });

  return events;
}

export async function fetchEvents(searchPhrase = '') {
    try {
      let query = db.collection('events');
  
      if (searchPhrase !== '') {
        const options = {
          keys: ['title', 'artist', 'salle'], // Champs dans lesquels on cherche
          includeScore: true, 
          threshold: 0.4, // intesité de la correction d'erreur
        };
  
        const eventsSnapshot = await query.get();
        const events = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const fuse = new Fuse(events, options);
        const searchResults = fuse.search(searchPhrase);
  
        // Extrait les items qui matchent
        const data = searchResults.map((result) => result.item);
  
        return data;
      } else {
        // pas de phrase entrée = fetch tout les events
        const querySnapshot = await query.get();
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        return data;
      }
    } catch (error) {
      console.log('Error fetching events:', error);
      return [];
    }
  }
