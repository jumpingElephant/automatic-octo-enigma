import { iterate } from 'automatic-octo-enigma/helpers/iterate';
import { module, test } from 'qunit';

module('Unit | Helper | iterate');

test('count=3, offset=0', function(assert) {
  let result = iterate([3], {});
  assert.equal(result.length, 3);
  assert.equal(result[0], 0);
  assert.equal(result[2], 2);
});

test('count=3, offset=1', function(assert) {
  let result = iterate([3], { offset: 1 });
  assert.equal(result.length, 3);
  assert.equal(result[0], 1);
  assert.equal(result[2], 3);
});
