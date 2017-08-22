(function(window) {
  'use strict';

  function POSRocketTransactionValidator(){
    var _POSRocketTransactionValidatorObject = {};

    function validateTransaction(transaction){
      return new Promise(function(resolve, reject){
        // If the tip_money is less than 12% of the total_collected money, reject the transaction
        if(transaction.tip_money.amount < (transaction.total_collected_money.amount * 0.12)){
          reject(Error('Tip value is too small.'));
        }
        resolve(transaction);
      });
    }

    function validateTransactionAgainstAPI(transaction) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        // Validator endpoint for POSRocket transactions
        req.open('GET', 'https://validator.posrocket.com/validateTransaction');

        req.onload = function() {
          if (req.status == 200) {
            resolve(transaction);
          } else {
            // If the validator returns any status code other than 200, reject the transaction
            reject(Error(req.statusText));
          }
        };

        req.onerror = function() {
          reject(Error("Network Error"));
        };

        req.send();
      });
    }

    /**
     * Validates transaction(s) using simple local tests
     * @param {Object} transactions
     * @return {Promise}
     */
    _POSRocketTransactionValidatorObject.validate = function(transactions) {
      if(transactions.constructor === Array) {
        return Promise.all(transactions.map(validateTransaction));
      } else {
        return validateTransaction(transactions);
      }
    };

    /**
     * Validates transaction(s) against an API endpoint
     * @param {Object} transactions
     * @return {Promise}
     */
    _POSRocketTransactionValidatorObject.APIValidate = function(transactions) {
      if(transactions.constructor === Array) {
        return Promise.all(transactions.map(validateTransactionAgainstAPI));
      } else {
        return validateTransactionAgainstAPI(transactions);
      }
    }

    return _POSRocketTransactionValidatorObject;
  }

  if(typeof(window.POSRocketTransactionValidator) === 'undefined'){
    window.POSRocketTransactionValidator = POSRocketTransactionValidator();
  }
  console.log(POSRocketTransactionValidator());
})(this);
