/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
window.momentum = window.momentum || {};

// Quotes

momentum.QuoteCtrl = function () {
  this.apiUrl = 'https://horizonshq.herokuapp.com/api/inspirationalquotes';
};

momentum.QuoteCtrl.prototype = {
  fetchQuote(cb) {
    $.ajax({
      url: this.apiUrl,
      method: 'GET',
      success: cb,
    });
  },
};
