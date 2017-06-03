import Ember from 'ember';

export default Ember.Component.extend({
  visible: false,
  closeOnBackdropClick: true,

  actions: {
    launchModal() {
      this.set('visible', true);
    },
    submitConfirm() {
      // call onConfirm with the value of the input field as an argument
      let promise = this.get('onConfirm')('Hello Alex');
      if (promise) {
        promise.then(() => {
          this.set('visible', false);
        });
      } else {
        alert('No promise returned');
      }
    },
    cancelConfirm() {
      this.set('visible', false);
    },
    backdropClick() {
      if (this.get('closeOnBackdropClick')) {
        this.get('actions')['cancelConfirm'].apply(this);
      }
    }
  }
});
