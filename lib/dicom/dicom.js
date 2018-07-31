'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dicomParser = require('dicom-parser');

var dicomParser = _interopRequireWildcard(_dicomParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var media = {
  resourceType: 'Media',
  type: { value: 1 },
  content: {
    data: { value: '' }
  }
};

var pixelData = null;

var createMedia = function createMedia(uint8array) {
  var dataSet = dicomParser.parseDicom(uint8array);
  var pixelDataElement = dataSet.elements.x7fe00010;
  if (pixelDataElement) {
    pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
  }
  if (pixelData) {
    media.content.data.value = Buffer.from(pixelData).toString('base64');
  }

  return media;
};

exports.default = {
  createMedia: createMedia
};