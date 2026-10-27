'use strict';
function calculateInterest(principal, rate, duration, unit) {
  if (![principal, rate, duration].every(Number.isFinite) || principal <= 0 || principal > 1e12 || rate < 0 || rate > 1000 || duration <= 0 || duration > 10000 || !['years', 'months'].includes(unit)) {
    throw new Error('Enter a valid amount, rate, and time within the allowed limits.');
  }
  const years = unit === 'months' ? duration / 12 : duration;
  const interest = principal * (rate / 100) * years;
  return { principal, interest, total: principal + interest };
}
if (typeof module !== 'undefined') module.exports = { calculateInterest };
if (typeof document !== 'undefined') {
  const get = id => document.getElementById(id);
  const form = get('calculator');
  const fields = ['principal', 'rate', 'duration'];
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
  function render() {
    fields.forEach(id => get(id).removeAttribute('aria-invalid'));
    try {
      for (const id of fields) {
        if (!get(id).checkValidity()) {
          get(id).setAttribute('aria-invalid', 'true');
          get(id).focus();
          const labels = {principal: 'Principal must be between 0.01 and 1,000,000,000,000.', rate: 'Annual rate must be between 0 and 1,000%.', duration: 'Time must be between 0.01 and 10,000.'};
          throw new Error(labels[id]);
        }
      }
      const principal = Number(get('principal').value);
      const rate = Number(get('rate').value);
      const duration = Number(get('duration').value);
      const unit = get('unit').value;
      const result = calculateInterest(principal, rate, duration, unit);
      const currency = new Intl.NumberFormat(get('currency').value === 'INR' ? 'en-IN' : 'en-US', { style: 'currency', currency: get('currency').value, minimumFractionDigits: 2, maximumFractionDigits: 2 });
      for (const [id, value] of [['total', result.total], ['principal-result', result.principal], ['interest-result', result.interest]]) get(id).textContent = currency.format(value);
      get('principal-bar').style.width = `${result.principal / result.total * 100}%`;
      const years = unit === 'months' ? duration / 12 : duration;
      get('breakdown').textContent = `${currency.format(principal)} × ${rate}% × ${Number(years.toPrecision(8))} years = ${currency.format(result.interest)} interest${unit === 'months' ? ` (${duration} months ÷ 12)` : ''}`;
      get('error').textContent = '';
      get('result-status').textContent = 'YOUR ESTIMATED RETURN';
    } catch (error) {
      get('error').textContent = error.message;
      get('result-status').textContent = 'FIX INPUTS TO CALCULATE';
      for (const id of ['total','principal-result','interest-result']) get(id).textContent = '—';
      get('breakdown').textContent = '';
      get('principal-bar').style.width = '0%';
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); render(); });
  form.addEventListener('input', () => { get('result-status').textContent = 'INPUTS CHANGED · CALCULATE TO UPDATE'; });
  get('currency').addEventListener('change', () => { get('currency-symbol').textContent = symbols[get('currency').value]; render(); });
  form.addEventListener('reset', () => {
    setTimeout(() => { get('currency-symbol').textContent = symbols[get('currency').value]; render(); }, 0);
  });
  render();
}
