// var fs = require("fs")
// var content = fs.readFileSync('./transaction.json')
var parsedJson = {
    "_id" : "589c493e5f2687111bb6d800",
    "business_id" : "3f522ee8-7e69-4d78-aeb5-5278aaf21558",
    "location_id" : "96e9975b-b1bf-47ee-aeaf-63518022e95e",
    "transaction_id" : "37a5f57a-48bc-483d-91b7-88c8b1b9509c",
    "receipt_id" : "Cj9uohMQNVflSq7taYtVRk",
    "serial_number" : "C1-498",
    "dining_option" : "In-House",
    "creation_time" : "2017-02-09T10:49:34.000Z",
    "discount_money" : {
        "amount" : 0,
        "currency" : "JOD"
    },
    "example" : [
      {
      "the" : 6,
      "batu" : 6,
      "man" : 6
      }
    ],

    "additive_tax_money" : {
        "amount" : 0,
        "currency" : "JOD"
    },
    "inclusive_tax_money" : {
        "amount" : 483,
        "currency" : "JOD"
    },
    "refunded_money" : {
        "amount" : 0,
        "currency" : "JOD"
    },
    "tax_money" : {
        "amount" : 483,
        "currency" : "JOD"
    },
    "tip_money" : {
        "amount" : 0,
        "currency" : "JOD"
    },
    "total_collected_money" : {
        "amount" : 3500,
        "currency" : "JOD"
    },
    "creator" : {
        "id" : "00000000-0000-0000-0000-000000000000",
        "name" : "John Doe",
        "email" : "anonymous@example.com"
    },
    "tender" : {
        "type" : "CASH",
        "name" : "CASH",
        "total_money" : {
            "amount" : 3500,
            "currency" : "JOD"
        }
    },
    "taxes" : [
        {
            "id" : "1",
            "name" : "S"
        },
        {
            "id" : "1",
            "name" : "S"
        }
    ],
    "itemization" : [
        {
            "id" : "788cb9cb-106f-4d32-ac48-df9e8433ff50",
            "name" : "Boneless Chicken Wings",
            "quantity" : 1,
            "total_money" : {
                "amount" : 3500,
                "currency" : "JOD"
            },
            "single_quantity_money" : {
                "amount" : 3500,
                "currency" : "JOD"
            },
            "gross_sales_money" : {
                "amount" : 3017,
                "currency" : "JOD"
            },
            "discount_money" : {
                "amount" : 0,
                "currency" : "JOD"
            },
            "net_sales_money" : {
                "amount" : 3017,
                "currency" : "JOD"
            },
            "category" : {
                "id" : "a9895c94-15cc-4db1-bbad-fe62d218c931",
                "name" : "Appetizers"
            },
            "variation" : {
                "id" : "37b64192-6b0f-479d-aeee-3c382a0671b9",
                "name" : "Plate",
                "pricing_type" : "FIXED",
                "price_money" : {
                    "amount" : 3500,
                    "currency" : "JOD"
                }
            },
            "Sales" : [
                {
                    "id" : 1

                }
            ],
            "discounts" : [],
            "modifiers" : [
                {
                    "id" : "7424ae3d-36bc-4c0c-b790-310614905aed",
                    "name" : "6 Pieces",
                    "quantity" : 1,
                    "applied_money" : {
                        "amount" : 0,
                        "currency" : "JOD"
                    }
                }
            ]
        }
    ]
}

(function(global){

// Validations, add your own, remove [] they break the code.
var validators = {
    //"_id" : "589c493e5f2687111bb6d800",

    // x = value passed from json file as a param. change to get false on execution
    "business_id" : function(x){ return (x=="3f522ee8-7e69-4d78-aeb5-5278aaf21558") },
    "location_id" : function(x){ return (x=="96e9975b-b1bf-47ee-aeaf-63518022e95e") },
    "transaction_id" : function(x){ return (x=="37a5f57a-48bc-483d-91b7-88c8b1b9509c") },

    // example key:value must exist in the provided json file
   "example" :
     {
     "the" : function(x){return (x==6)},
     "batu" : function(x){return (x==6)},
     "man" : function(x){return (x==6)}
     },

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
function validate(validators, parsedJson){
    for(var key in validators){
      console.log("key = " , key);

      //check if the key has an array subtree
        if(Array.isArray(parsedJson[key])){
            for(var subKey in parsedJson[key]){
              console.log("subKey = " , subKey);
                if(!validate(validators[key],parsedJson[key][subKey])){
                    return false
                }
            }

            //check if the json file has a object subtree
        }else if(typeof parsedJson[key] === 'object'){
              if(!validate(validators[key],parsedJson[key])){
                    return false
              }
              //main logic
        }else if(!(validators[key](parsedJson[key]))){
                return false
        }
    }
    return true
}


})(window)

console.log(validate(validators,parsedJson))
