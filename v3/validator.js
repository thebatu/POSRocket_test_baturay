var fs = require("fs")

var content = fs.readFileSync('./transaction.json')
var parsedJson = JSON.parse(content)

var validators = {
    //"_id" : "589c493e5f2687111bb6d800",
    "business_id" : function(x){return (x=="3f522ee8-7e69-4d78-aeb5-5278aaf21558")},
    "location_id" : function(x){return (x=="96e9975b-b1bf-47ee-aeaf-63518022e95e")},
    "transaction_id" : function(x){return (x=="37a5f57a-48bc-483d-91b7-88c8b1b9509c")},

   "example" :
     {
     "batu" : function(x){return (x==0)},
     "man" : function(x){return (x==1)}
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
        if(Array.isArray(parsedJson[key])){
            for(var subKey in parsedJson[key]){
                if(!validate(validators[key],parsedJson[key][subKey])){
                    return false
                }
            }
        }else if(typeof parsedJson[key] === 'object'){
              if(!validate(validators[key],parsedJson[key])){
                    return false
              }


        }else if(!(validators[key](parsedJson[key]))){
                return false
        }
    }
    return true
}

console.log(validate(validators,parsedJson))
