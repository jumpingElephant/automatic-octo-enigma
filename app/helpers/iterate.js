import Ember from 'ember';

export function iterate(params, namedArgs) {
  var start = namedArgs.offset || 0;
  var count = params[0];

  var ret = [];
  for (var i = 0; i < count; i++) {
    ret.push(i + start);
  }
  return ret;
}

export default Ember.Helper.helper(iterate);
