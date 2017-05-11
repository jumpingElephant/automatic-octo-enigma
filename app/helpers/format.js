import Ember from 'ember';
import moment from 'moment';

export function format(params /*, hash*/ ) {
  var type = params[0];
  var value = params[1];
  var postfix = params[2];

  if (!value) {
    return "";
  }

  var s;

  switch (type) {
    case 'date':
      s = moment(value).format('DD.MM.YYYY');
      break;
    default:
      s = new String(value);
  }
  if (postfix) {
    s += postfix;
  }
  return s;
}

export default Ember.Helper.helper(format);
