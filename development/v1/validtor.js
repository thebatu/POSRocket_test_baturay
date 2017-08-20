var fs = require("fs")

var content = fs.readFileSync("transaction.json")

var l = { "business_id" : function(x){return (x=="12")},
          "location_id" : function(x){return (x=="14")},
}


//{key:function()}
function validate(lis,j){
    var test = JSON.parse(j)

    for(var c in lis){
      console.log(c);
      console.log(lis[c]), typeof (test[c] === 'number');
       if(!(lis[c](test[c]))){
           return false
        }
    }
    return true
}

console.log(validate(l,content))
