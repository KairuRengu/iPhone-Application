TODO:

  * eBay API to actually post ads on the behalf of the user
  * Time permitting, we should also look into reverse-engineering the Kijiji
    API and implementing posting there. It could be on the same REST call, on
    behalf of the user.

DONE:

    * Can we create a hash of the images we upload so when we're testing
    the hits aren't crazy? Otherwise, Google will not be impressed with us.

    * Create some kind of Data Access Layer so that information can be reasoned
    and fetched about for a particular request.

    * We need `routes` to be able to test with something like POSTman and of course,
    to begin wiring  up to the actual iPhone application.

    * We should at minimum cache ThePriceGeek results to reduce serving times.
    We may be able to cache the reverse-image lookups somehow, but that's
    not decided yet.

  * Fetch some of the results, such as Wikipedia if possible and implement
  some kind of `LinkScanner` which is able to gleam more information about
  the product we're going to look up.
    * We can use this for price tuning
    * It can also be used to fill in some description / title data automatically
    on a per item basis
