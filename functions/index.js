const functions = require('firebase-functions');
const async = require('async');
const axios = require('axios');

const CLOUDINARY_NAME = functions.config().cloudinary.name;
const CLOUDINARY_KEY = functions.config().cloudinary.key.substring(1);
const CLOUDINARY_SECRET = functions.config().cloudinary.secret;

const CLOUDINARY_BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}`;

const CLOUDINARY_AUTH = { username: CLOUDINARY_KEY, password: CLOUDINARY_SECRET };

function getAlbums(callback) {
  axios.get(`${CLOUDINARY_BASE_URL}/folders`, { auth: CLOUDINARY_AUTH })
  .then(response => response.data)
  .then((data) => {
    const albums = [];
    data.folders.forEach(album => albums.push(album.path));
    callback(null, albums);
  });
}

function getPhotos(prefix, callback) {
  axios.get(
    `${CLOUDINARY_BASE_URL}/resources/image/upload`,
    {
      auth: CLOUDINARY_AUTH,
      params: { prefix }
    }
  )
    .then(response => response.data)
    .then(data => callback(null, { album: prefix, photos: data.resources }));
}

function getPhotosFromAlbums(albums, callback) {
  async.map(albums, getPhotos, (err, results) => {
    callback(null, results);
  });
}

exports.cloudinary = functions.https.onRequest((req, res) => {
  async.waterfall([
    cb => getAlbums(cb),
    (albums, cb) => getPhotosFromAlbums(albums, cb)
  ], (err, results) => {
    res.status(200).send(results);
  });
});
