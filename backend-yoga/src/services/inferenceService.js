const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Cancer', 'Non Cancer', 'Cancer2'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let explanation, suggestion;

    if (label === 'Cancer') {
      suggestion = "Segera Periksa ke dokter! terdekat jika ukuran semakin membesar dengan cepat, mudah luka, atau berdarah."
    }
  
    if (label === 'Non Cancer') {
      suggestion = "Segera Periksa ke dokter! terdekat untuk meminimalisasi penyebaran kanker."
    }
  
    if (label === 'Cancer2') {
      suggestion = "Segera Periksa ke dokter! terdekat untuk mengetahui detail terkait tingkat bahaya penyakit."
  
    }

    return { confidenceScore, label, explanation, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
