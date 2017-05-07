import Ember from 'ember';
import ColumnsMixin from 'automatic-octo-enigma/mixins/columns';
import { module, test } from 'qunit';

module('Unit | Mixin | columns');

// Replace this with your real tests.
test('it works', function(assert) {
  let ColumnsObject = Ember.Object.extend(ColumnsMixin);
  let subject = ColumnsObject.create();
  assert.ok(subject);
});
