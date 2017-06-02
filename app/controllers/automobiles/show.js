import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    createBill(bill) {
      //send message here and return a promise
      console.log('bill: ' + bill);
    }
  }
});
