'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Profile = new Schema({
  nombre: {
    type: String,
    required: 'introduzca el nombre'
  },
  titulo: {
    type: String,
    default: 'N/A'
  },
  descripcion: {
    type: String,
    default: 'N/A'
  },
  imagen: {
    type: String,
    default: 'N/A'
  }
});

module.exports = mongoose.model('Profile', Profile);
