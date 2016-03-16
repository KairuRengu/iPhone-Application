var assert = require('chai').assert
var ImageHasher = require('../lib/ImageHasher')

describe('ImageHasher', function() {
	var commandDirectory = process.cwd()
	console.log(commandDirectory)
	var commandDirectoryIndex = commandDirectory.lastIndexOf('\\') + 1
	commandDirectory = commandDirectory.substring(commandDirectoryIndex, commandDirectory.length)
	describe('#getImageBase64String', (done) => {
    var hasher = new ImageHasher()
	if (commandDirectory == "server"){
		it('should return null if the file is missing', (done) => {
			hasher.getImageBase64String('tests/res/homura', (hash) => {
				assert.isNull(hash)
				done()
			})
		})
	}else if(commandDirectory == "tests"){
		it('should return null if the file is missing', (done) => {
			hasher.getImageBase64String('res/homura', (hash) => {
				assert.isNull(hash)
				done()
			})
		})
	}else{
		console.log("Please run the command in the server or tests directory")
	}



  })
})
