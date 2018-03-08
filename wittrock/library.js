var _ = {
   map: function() {
   },
   reduce: function(list, callback, memo) { 
      reducted = 0
      for (var i = 0; i < list.length; i++) {
       reducted += callback(memo, list[i])
        
      }
      return reducted;
   },
   find: function(arr, callback) {
    for (var i = arr.length; i >= 0; i--) {
      if(callback(arr[i])){
        return arr[i];
      }
    }
   },
   filter: function(arr, callback) { 
    newarr = []
    for (var i = 0; i < arr.length; i++) {
      if(callback(arr[i])){
        newarr.push(arr[i])
          
        
      }

    }
    return newarr;
   },
   reject: function(arr, callback) { 
    newarr=[]
    for (var i = arr.length; i >= 0; i--) {
      if(callback(arr[i])){
        newarr.push(arr.pop(arr[i]))
      }
    }
    return arr
   }
 }
 
var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log(evens);
var reduction = _.reduce([1,2,3], function(memo, num){return memo + num}, 0)
console.log(reduction)
var even = _.find([1,3,5,7,9,10], function(num){return num % 2 == 0})
console.log(even)
var odds = _.reject([1,2,3,4,5,6], function(num){return num % 2 == 0})
console.log(odds)
