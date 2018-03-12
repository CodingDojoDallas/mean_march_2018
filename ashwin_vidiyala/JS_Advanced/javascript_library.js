var _ = {
  map: function(array, callback) {
    for(let i = 0; i < array.length; i++) {
      array[i] = callback(array[i]);
    }
    return array;
  },

  reduce: function(array, callback, memo = 0) {
    for(let i = 0; i < array.length; i++) {
      memo = callback(array[i], memo)
    }
    return memo;
  },

  find: function(array, callback) {
    for(let i = 0; i < array.length; i++) {
      if (callback(array[i])) {
        return array[i];
      }
    }
  },

  filter: function(array, callback) {
    let answer_array = [];
    for (let i = 0; i < array.length; i++) {
      if (callback(array[i])) {
        answer_array.push(array[i]);
      }
    }
    return answer_array;
  },

  reject: function(array, callback) {
    let answer_array = [];
    for (let i = 0; i < array.length; i++) {
      if (!callback(array[i])) {
        answer_array.push(array[i]);
      }
    }
    return answer_array;
  },
}

let array = [1,2,3,4,5]
let array2 = [1,2,3,4,5]

console.log(`Original Array: [${array}]`);

let squares = _.map(array2, function(num) { return num ** 2; });
console.log('Map Function: ', squares);

let sum = _.reduce(array, function(num, memo) { return num * memo; }, 1);
console.log('Reduce Function: ', sum);

let even = _.find(array, function(num) { return num % 2 == 0; });
console.log('Find Function: ', even);

let even_filter = _.filter(array, function(num) { return num % 2 == 0; });
console.log('Filter Function: ', even_filter);

let even_reject = _.reject(array, function(num) { return num % 2 == 0; });
console.log('Reject Function: ', even_reject);
