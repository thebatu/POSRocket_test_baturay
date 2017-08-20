(function(global){

  var fs = require("fs")
  var content = fs.readFileSync('./transaction.json')
  var parsedJson = JSON.parse(content);


  var transactionValidator = return new Promise(function(resolve,reject){
    var _transactionValidatorObject = {};

    function id(dataFromJson) {
      return new Promise(function(resolve,reject){
        if (dataFromJson == "589c493e5f2687111bb6d800") {
          resolve(true);
        }
        else {
          reject(Error("wrong id"));
        }
      })
    };

    function business_id(dataFromJson){
      return new Promise(function(resolve,reject){
        if (dataFromJson == "3f522ee8-7e69-4d78-aeb5-5278aaf21558"){
          resolve(true)
        }
        else{
          reject(Error('wrong business_id'))
        }
      })
    };

    function location_id(dataFromJson){
      return new Promise(function(resolve,reject){
        if (dataFromJson == "96e9975b-b1bf-47ee-aeaf-63518022e95e"){
          resolve(true)
        }
        else{
          reject(Error('wrong location_id'))
        }
      })
    };

  })





    var validators = {
        "_id" : id,
        "business_id" : business_id,
        "location_id" : location_id,
        "transaction_id" : function(x){return (x=="37a5f57a-48bc-483d-91b7-88c8b1b9509c")},

        "discount_money" : {
                "amount" : function(x){return (x==0)},
                "currency" : function(x){return (x=="JOD")}
         },
        "taxes" :{
                "id" : function(x){return (x=="1")},
                "name" : function(x){return (x=="S")}
        }
    }

    //{key:function()}
    _transactionValidatorObject.validate = function(validators, parsedJson){
      return new Promise(function(resolve,reject){
        for(var key in validators){
          //check if the key has an array subtree
            if(Array.isArray(parsedJson[key])){
                for(var subKey in parsedJson[key]){
                    if(!validate(validators[key],parsedJson[key][subKey])){
                        return reject(Error(parsedJson[key][subKey].index));

                    }
                }
                //check if the json file has a object subtree
            }else if(typeof parsedJson[key] === 'object'){
                  if(!validate(validators[key],parsedJson[key])){
                    return reject(Error(parsedJson[key][subKey].index));
                  }
                  //main logic
            }else if(!(validators[key](parsedJson[key]))){
                    return reject(Error(parsedJson[key][subKey].index));
            }
        }
        return resolve(true);
      })
    }

    // promises:array = fetch all promises from line 7 until 41. from validate(should be core function of json validation ) function
    //




    return _transactionValidatorObject;


  }

  if(typeof(global.transactionValidator) === 'undefined'){
    global.transactionValidator = transactionValidator();
  }
  console.log(validate(validators,parsedJson))

})(this);
