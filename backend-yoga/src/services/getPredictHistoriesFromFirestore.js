const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const getPredictHistoriesFromFirestore = async () => {
  const snapshot = await firestore.collection('predictions').get();
  const histories = snapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() };
  });
  return histories;
};

module.exports = getPredictHistoriesFromFirestore;
