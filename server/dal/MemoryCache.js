'use strict'
var assert = require('chai').assert

/**
 * A very basic memory cache that can be used for looking stuff up without
 * too much of a hassle. This becomes handy when responses become very long-winded
 * and expensive to test over and over again.
 *
 * NOTE: Right now, we're simply using some cheap in memory-RAM cache to keep things
 * super lean.
 */
class MemoryCache {
  constructor() {
      this._cache = {}
  }

  /**
   * Adds an image to the product cache. If the key is already present,
   * it will be overwritten by the new value. Only strings are accepted for the
   * key.
   */
  addToCache(key, value) {
    assert.isString(key)
    this._cache[key] = value
  }

  /**
   * Fetches the value in the cache, returning null if not found.
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  get(key) {
    return this._cache[key] || null
  }
}

module.exports = MemoryCache
