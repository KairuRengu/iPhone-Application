'use strict'

var _ = require('lodash')

/**
 * A metadata attachment from a URL, allowing for attachments to be gleaned
 * from various sources.
 */
class MetadataAttachment {
  constructor(resourceURL) {
    this.type = this._getTypeFromURL(resourceURL)
    this.value = resourceURL
  }

  _getTypeFromURL(resourceURL) {
    var IMAGE_TYPES = ['jpg', 'png', 'gif', 'bmp']
    var VIDEO_TYPES = ['mp4', 'ogv', 'avi']

    var isImage = this._doesEndWithOneOfExtensions(resourceURL, IMAGE_TYPES)
    var isVideo = this._doesEndWithOneOfExtensions(resourceURL, VIDEO_TYPES)
    var isYoutube = resourceURL.indexOf('youtube') > -1

    if(isImage) {
      return 'image'
    } else if (isVideo) {
      return 'video'
    } else if (isYoutube) {
      return 'youtube'
    } else {
      return 'unknown'
      console.log('Resource w/ URL %s had an unknown type. Is this a bug or oversight?')
    }
  }

  _doesEndWithOneOfExtensions(s, extensions) {
    return _.some(extensions, (extension) => {
      return s.endsWith(extension)
    })
  }
}

module.exports = MetadataAttachment
