var assert = require('chai').assert
var MemoryCache = require('../dal/MemoryCache')

describe('MemoryCache', () => {
  describe('#addToCache', () => {
    it('should add to the cache when nothing is there', (done) => {
      var cache = new MemoryCache()
      cache.addToCache('test', 'test')
      assert.isNotNull(cache.get('test'))
      done()
    })

    it('should throw an exception when a non-string key is given', (done) => {
      var cache = new MemoryCache()
      try {
        cache.addToCache(12, 'sdsad')
      } catch(e) {
        done()
        return // exit out, test done
      }
      assert.fail('did not throw exception as expected!')
    })

    it('should overwrite an existing value in the cache if duplicate key is given', (done) => {
      var cache = new MemoryCache()
      cache.addToCache('test', 'test1')
      cache.addToCache('test', 'test2')
      assert(cache.get('test') === 'test2')
      done()
    })
  })

  describe('#get', () => {
    it('should return null if the key does not exist', (done) => {
      var cache = new MemoryCache()
      var value = cache.get('key_that_does_not_exist')
      assert.isNull(value)
      done()
    })
    it('should return the value if the key does exist', (done) => {
      var cache = new MemoryCache()
      var test = {
        'dev': 'prod'
      }

      cache.addToCache('key', test)
      var value = cache.get('key')
      assert.isObject(value)
      assert(JSON.stringify(value) === JSON.stringify(test))
      done()
    })
  })
})
