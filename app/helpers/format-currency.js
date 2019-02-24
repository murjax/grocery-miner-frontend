import { helper } from '@ember/component/helper';
import $ from 'jquery';

export function formatCurrency(value) {
  value = value[0];
  if (!$.isNumeric(value)) {
    return '';
  }
  const formattedNumber = Number(value).
    toFixed(2).
    replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  return `$${formattedNumber}`;
}

export default helper(formatCurrency);
