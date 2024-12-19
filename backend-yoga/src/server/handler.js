const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getPredictHistoriesFromFirestore = require('../services/getPredictHistoriesFromFirestore'); // Pastikan Anda memiliki file ini

const postPredictHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  try {
    const maxImageSize = 1000000; 
    const imageSize = Buffer.byteLength(image, 'base64'); 
    if (imageSize > maxImageSize) {
      return h.response({
        status: 'fail',
        message: 'Payload content length greater than maximum allowed: 1000000'
      }).code(413); 
    }


    const { confidenceScore, label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      "id": id,
      "result": label,
      "suggestion": suggestion,
      "confidenceScore": confidenceScore,
      "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
      status: 'success',
      message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
      data
    })
    response.code(201);
    return response;
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kesalahan dalam melakukan prediksi'
    }).code(400);
  }
}

const getPredictHistoriesHandler = async (request, h) => {
  try {
    const histories = await getPredictHistoriesFromFirestore();

    const formattedHistories = histories.map(history => {
      return {
        id: history.id,
        history: {
          result: history.result,
          createdAt: history.createdAt.toISOString(),
          suggestion: history.suggestion,
          id: history.id
        }
      };
    });

    return h.response({
      status: 'success',
      data: formattedHistories
    }).code(200);
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Gagal mengambil riwayat prediksi'
    }).code(500);
  }
};

module.exports = {
  postPredictHandler,
  getPredictHistoriesHandler
};
