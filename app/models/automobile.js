import DS from 'ember-data';

export default DS.Model.extend({
  automobileId: DS.attr(),
  displayName: DS.attr(),
  bills: DS.attr()
});
