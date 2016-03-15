var assert = require('chai').assert

/**
 * This class can take information about a product and create strings
 * and tags that represent specific things for the {Product} which can be useful
 * for specific search engines.
 *
 * A good example of this is often our product comes in several varietes, such as
 * it is on the 'PS4' platform or 'PC' platform and these are important criteria to involve.
 * Some search engines care most about this than others, so we deal with them here.
 *
 * Or in some cases, an item might be 'limited edition', so applying tags here makes sense.
 * The tags to apply are left to the implementation, since some search engines will do a better job
 * than others at this.
 *
 * The API is similar to the following:
 * var tags = new ProductQueryTagBuilder()
 * 	.withGamePlatform()
 * 	.withCustomTag('custom')
 * 	.get();
 *
 * This allows for super flexible building without a lot of problematic optionals
 * and a billion boolean flags to decide what to build.
 */
class ProductQueryTagBuilder {
  constructor(product) {
      assert.isNotNull(product)
      // String buffer
      this._tags = []
      this._product = product
  }

  /**
   * Adds a game specific platform tag to the buffer
   * @return {[ProductQueryTagBuilder]} Returns itself, for fluent method chaining
   */
  withGamePlatform() {
      this._appendTag('ps4')
      return this
  }

  /**
   * Adds a specific limited edition or not tag to the game, depending on the model
   * of the data and if it supports it.
   * @return {[ProductQueryTagBuilder]} Returns itself, for fluent method chaining
   */
  withSpecialEdition() {
    this._appendTag('limited edition')
  }

  /**
   * Appends a custom tag to the builder
   * @param  {tag} tag The custom tag to apply
   * @return {[type]}     [description]
   */
  withCustomTag(tag) {
    this._appendTag(tag)
    return this
  }

  /**
   * Returns the tags as a string, a nice clean implementation of it.
   * @return {string} The space-delimited tags of strings available to the user
   */
  get() {
    return this._tags.join(' ')
  }

  // Internal implementation, just adds a tag to the list so that things are
  // pushed properly
  _appendTag(tag) {
      this._tags.push(tag)
  }

}
