import { openDB } from 'idb';

const dbName = 'jate';

const initdb = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      }
    },
  });
  return db;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate'); 
  await store.add({ content }); 
  await tx.done;
  console.log('Content added to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (id) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly'); 
  const store = tx.objectStore('jate'); 
  const content = await store.get(id); 
  return content;
};

initdb();
