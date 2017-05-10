export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
  this.namespace = '/api';

  let automobiles = [{
    type: 'automobiles',
    id: 'Audi_A3',
    attributes: {
      'automobile-id': 'Audi_A3',
      'display-name': 'Audi A3',
      bills: [{
        date: '2017-04-17',
        mileage: 42,
        quantity: 1,
        price: 2
      }, {
        date: '2017-04-18',
        mileage: 43,
        quantity: 2,
        price: 3
      }, {
        date: '2017-04-19',
        mileage: 44,
        quantity: 2,
        price: 3
      }, {
        date: '2017-04-20',
        mileage: 45,
        quantity: 2,
        price: 3
      }]
    }
  }, {
    type: 'automobiles',
    id: 'Porsche',
    attributes: {
      'automobile-id': 'Porsche',
      'display-name': 'Porsche',
      bills: [{
        date: '2017-04-17',
        mileage: 426,
        quantity: 1,
        price: 2
      }, {
        date: '2017-04-18',
        mileage: 436,
        quantity: 2,
        price: 3
      }]
    }
  }];

  this.get('/automobiles', function() {
    return {
      data: automobiles
    };
  });

  this.get('/automobiles/:id', function(db, request) {
    return { data: automobiles.find((automobile) => request.params.id === automobile.id) };
  });
}
