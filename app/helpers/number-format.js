import Ember from 'ember';

export function numberFormat(params, args) {
  var number = params[0];
  var postfix = params[1];
  var digits = args.digits;
  var decimalSeparator = args.decSep;
  var thousandsSeparator = args.thousSep;

  if (isNaN(number) || number == null) return '';

  number = number.toFixed(digits);
  thousandsSeparator = typeof thousandsSeparator == 'string' ? thousandsSeparator : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (decimalSeparator || '.') + parts[1] : '';

  postfix = postfix || '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + thousandsSeparator) + decimals + postfix;
};

export default Ember.Helper.helper(numberFormat);
