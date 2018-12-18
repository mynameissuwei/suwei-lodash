var suwei = {};


// Array


suwei.chunk = chunk = (array, size = 1) => array.reduce((x, y, i) => (i % size === 0 ? x.push([y]) : x[i / size | 0].push(y), x) ,[]);

// function chunk(array, size = 1) {
//   var store_arr = [];
//   var result = [];
//   var length = Math.floor(array.length / size) * size
//   for (var i = 0; i < length; i++) {
//     store_arr[i % size] = array[i];
//     if(store_arr.length == size) {
//       result.push(store_arr);
//       store_arr = [];
//     }
//     //if((i + 1) % 3 != 0)
//   }
//   for(var j = length; j < array.length; j++) {
//     store_arr[j % size] = array[j];
//   }
//   if(store_arr.length != 0)
//   result.push(store_arr);
//   return result;
// } 



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.compact = (array) => array.filter(x => x);

// function compact(arr){
//   var input_arr = arr;
//   var new_arr = [];
//   for(var i = 0; i < input_arr.length; i++) {
//     if(arr[i]) {
//       new_arr.push(arr[i]);
//     }
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.concat = (array, ...args) => args.reduce((x, y) => (Array.isArray(y) ? x.push(...y) : x.push(y), x), array);


// function concat(array,values) {
//   var input_arr = array;
//   var new_arr = [];
//   for(var i = 0; i < arguments.length; i++){
//     if(typeof(arguments[i]) == "object") {
//       for(var j = 0; j < arguments[i].length; j++) {
//         new_arr.push(arguments[i][j]);
//       }
//     } else {
//       new_arr.push(arguments[i]);
//     }
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.difference = (array, values) => array.reduce((x, y) => (~values.indexOf(y) || x.push(y), x), []);

// function difference(arr, value){
//   var input_arr = arr;
//   var new_arr = [];
//   for(var i = 0; i < input_arr.length; i++) {
//     var count = 0;
//     for(var j = 0; j < value.length; j++) {
//       if(input_arr[i] != value[j]) {
//         count++;
//         //continue;
//       }
//     }
//     if(count == value.length) {
//       new_arr.push(input_arr[i])
//     }
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.differenceBy =

function differenceBy(arr, value, iteratee) {
  
  var input_arr = arr;
  var new_arr = [];
  for(var i = 0; i < input_arr.length; i++) {
    var count = 0;
    for(var j = 0; j < value.length; j++) {
      if(typeof(iteratee) == "function" && iteratee(input_arr[i]) != iteratee(value[j])) {
        count++;
        //continue;
      }
      if(typeof(iteratee) != "function" && getObjectValue(input_arr[i], iteratee) !=  getObjectValue(value[j], iteratee))
        count++;
    }
    if(count == value.length) {
      new_arr.push(input_arr[i])
    }
  }
  return new_arr;

}


function getObjectValue(object, attr) {
  var input_object = object;
  return input_object[attr];
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.differenceWith  =  

function dropRightWhile(objects, value, comparator) {
  var arr = [];
  var amount;
  for(var i = 0; i < objects.length; i++) {
    amount = 0;
    for(j = 0; j < value.length; j++) {
      if(!comparator(objects[i], value[j])) {
        amount++;
      }
    }
    if(amount == value.length) {
      arr.push(objects[i]);
    }
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.drop = (array, n = 1) => array.reduce((x, y, i) => (i >= n && x.push(y), x), []);
 
// function drop(arr, n = 1) {
//   var new_arr = arr;
//   for(var i = 0; i < n; i++) {
//     new_arr.shift();
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.dropRight = (array, n = 1) => array.reduce((x, y, i) => (i < array.length - n && x.push(y), x), []);

// function dropRight(arr, n = 1) {
//   var new_arr = arr;
//   for(var i = 0; i < n; i++) {
//     new_arr.pop();
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

suwei.dropRightWhile = 

function dropRightWhile(array, predicate) {
  var a = suwei.judge(predicate);
  for(var i = array.length - 1; i >= 0; i--) {
      if(a(array[i]) == false) {
        array.splice(i + 1);
        return array;
      }
  }
  return [];
}

suwei.judge = 
function judge(arg) {
  var str = Object.prototype.toString.call(arg); 
  if(str == "[object Object]") {
    return _.matches(arg);
  } else if(str == "[object String]") {
    return _.property(arg);
  } else if(str == "[object Array]") {
    return _.matchesProperty(arg[0], arg[1]);
  } else if(str == "[object Function]") {
    return arg;
  } else if(str == "[object RegExp]") {
    return Boolean;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.dropWhile =

function dropWhile(array, predicate) {
  var a = suwei.judge(predicate);
  for(i = 0; i < array.length; i++) {
    if(a(array[i]) == false) {
      array.splice(0, i);
      return array;
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.fill = (array, value, start = 0, end = array.length) => ([...array].some((x, i) => start <= i && i < end && (array[i] = value) && i >= end && true), array)

// function fill(array, value, start = 0, end) {
//   var new_arr = array;
//   if(end === undefined) {
//     end = array.length;
//   }
//   for(var i = start; i < end; i++) {
//     new_arr[i] = value; 
//   } 
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.findIndex = (array, predicate, fromIndex = 0) => array.findIndex(suwei.judge(predicate));

// function findIndex(array, predivate, fromIndex = 0) {
//   var a = suwei.judge(predivate);
//   for(i = fromIndex; i < array.length; i++) {
//     if(a(array[i]) == true) {
//       return i
//     }
//   }
//   return -1;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.findLastIndex = 

function findIndex(array, predivate, fromIndex = array.length - 1) {
  var a = suwei.judge(predivate);
  for(i = fromIndex; i >= 0; i--) {
    if(a(array[i]) == true) {
      return i;
    }
  }
  return -1;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.head = array => array[0];

// function head(array) {
//   result = array[0];
//   return result;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flatten = array => array.reduce((a, b) => a.concat(b), []);

// function flatten(array) {
//   return array.concat().reduce((a, b) => a.concat(b), []);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flattenDeep = array => array.reduce((a, b) => a.concat(Array.isArray(b) ? suwei.flattenDeep(b) : b), []);


// function flattenDeep(array) {
//   return array.reduce((a, b) => a.concat(Array.isArray(b) ? flattenDeep(b) : b), []);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flattenDepth = 

function flattenDepth(array, depth = 1) {
  return array.concat().reduce((a, b) => a.concat(Array.isArray(b) && depth > 1 ? flattenDepth(b, --depth) : b), []);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.fromPairs = pairs => pairs.reduce((a, b) => (a[b[0]] = b[1], a), {})

// function fromPairs(pairs) {
//   var obj = {};
//   for(key in pairs) {
//     obj[pairs[key][0]] = pairs[key][1]
//   }
//   return obj;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.head = array => array[0];

// function head(array) {
//   return array[0];
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.indexOf = (array, value, fromIndex = 0) => array.indexOf(value, fromIndex <= -array.length ? 0 : -array.length < fromIndex && fromIndex < 0 ? fromIndex + array.length : fromIndex);                   

// function indexOf(array, value, fromIndex = 0) {
//   if(fromIndex < 0) {
//     return array.lastIndex(value, fromIndex + array.length)
//   } else {
//     return array.indexOf(value, fromIndex);
//   }
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.initial = array => array.slice(0, -1);

// function initial(array) {
//   array.pop();
//   return array;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.intersection = (...arg) => arg[0].reduce((x, y) => (arg.every(a => a.includes(y)) && x.push(y), x),[])

// function intersection(...ary) {
//   var arr1 = ary[0];
//   var new_arr = [];
//   for(i = 0; i < arr1.length; i++) {
//     amount = 0
//     for(j = 0; j < ary.length; j++) {
//       if(ary[j].indexOf(arr1[i]) == -1) {
//         break;
//       } else amount++;
//     }
//     if(amount == ary.length) {
//       new_arr.push(arr1[i]);
//     }
//   }
//   return new_arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.intersectionBy = 

function intersectionBy(...arg) {
  var iteratee = arg.pop(); 
  var a = suwei.judge(iteratee);
  var new_arg = arg.map(x => x.map(b => a(b)));
  


  var arr1 = new_arg[0];
  var new_arr = [];
  for(i = 0; i < arr1.length; i++) {
    amount = 0;
    for(j = 0; j < arg.length; j++) {
      if(new_arg[j].indexOf(arr1[i]) == -1) {
        break;
      } else amount++;
    }
    if(amount == new_arg.length) {
      new_arr.push(arg[0][i]);
    }
  }
  return new_arr;

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.intersectionWith = 

function intersectionWith(...arg) {
  var comparator = arg.pop();
  return arg[0].filter(x => arg[1].some(comparator.bind(null,x)));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.join = (array, separator = ",") => array.reduce((a, b, i) => i === 0 ? b + "" : a + separator + b, "")

// function join(array, separator) {
//   return array.join(separator);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.last = array => array[array.length - 1]

// function last(array) {
//   return array[array.length - 1];
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.lastIndexOf =

function lastIdexOf(array, value, fromIndex = array.length -1) {
  for(i = fromIndex; i >= 0; i--) {
    if(array[i] == value) {
      return i;
    }
  }
  return -1;
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.nth = (array, n) => n < 0 ? array[array.length + n] : array[n];

// function nth(array, n) {
//   return n < 0 ? array[array.length + n] : array[n];
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.pull = (array, ...value) => (index = 0, [...array].reduce((x, y) => (value.includes(y) && x.splice(index--, 1), index++, x), array));


suwei.pull = (array, ...value) => [...array].reduce((x, y, i, arr) => (value.includes(y) && x.splice(i - arr.length + array.length, 1), x), array);


// function pull(array, ...value) {
//   for(i = 0; i < value.length; i++) {
//     for(j = 0; j < array.length; j++) {
//       if(array[j] === value[i]) {
//         array.splice(j,1);
//         j--;
//       }
//     }
//   }
//   return array;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pullAll = (array, values) => suwei.pull(array, ...values);

// function pullAll(array, values) {
//   return suwei.pull.bind(null, array).apply(null,values);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pullAllBy =

function pullAllBy(array, values, iteratee) {
  var a = suwei.judge(iteratee);
  for(i = 0; i < values.length; i++) {
    for(j = 0; j < array.length; j++) {
      if(a(array[j]) === a(values[i])) {
        array.splice(j,1);
        j--;
      }
    }
  }
  return array;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pullAllWith = 

function pullAllWith(array, values, comparator) {
  for(i = 0; i < values.length; i++) {
    for(j = 0; j < array.length; j++) {
      if(comparator(values[i], array[j])) {
        array.splice(j,1);
        j--;
      }
    }
  }
  return array;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.pullAt = (array, indexes) => array.map((x, i) => [x, i]).reduce((a, b, k) => indexes.includes(b[1]) ,[])



// suwei.pullAt = (array, indexes) => [...array].reduce((x, y, i) => (i === indexes[0] && (x.push(...array.splice(i - x.length, 1)) && indexes.shift()), x), [])

suwei.pullAt = 

// function pullAt(array, indexes) {
//   var result = [];
//   var count = 0;
//   for(var i = 0; i < indexes.length; i++) {
//     result.push(array[indexes[i]]);
//   }
//   var sortArr = indexes.sort((x, y) => x - y);
//   for(var j = 0; j < sortArr.length; j++) {
//     array.splice(sortArr[j] - count, 1);
//     count++;
//   }
//   return result;
// }

function pullAt(array, indexes) {
  var result = [];
  for(var i = 0; i < indexes.length; i++) {
    result.push(array[indexes[i]]);
  }
  var sortArr = indexes.sort((x, y) => y - x);
  for(var j = 0; j < sortArr.length; j++) {
    array.splice(sortArr[j], 1);
  }
  return result;
}




// function pullAt(array, indexes) {
//   var arr = indexes.sort((a, b) => a - b);
//   var amount = 0;
//   var result = [];
//   for(var i = 0; i < arr.length; i++) {
//     result.push(...array.splice(arr[i] - amount, 1));
//     amount++;
//   }
//   return result;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.remove = (array, predicate) => array.slice().reduce((x, y, i) => (predicate(y) && x.push(...array.splice(i - x.length, 1)), x), [])

// function remove(array, predicate) {
//   var arr = [];
//   for(var i = 0; i < array.length; i++) {
//     if(predicate(array[i]) == true) {
//       arr.splice(arr.length, 0, array.splice(i, 1)[0]);
//       i--;
//     }
//   }
//   return arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.reverse = array => array.reduceRight((x, y) => , array)

suwei.reverse = array => array.reduce((x, y, i) => (i < Math.floor(array.length / 2) && ([x[i], x[array.length - 1 - i]] = [x[array.length - 1 - i], x[i]]), x), array)

//解法2： array.sort(() => 1);

// function reverse(array) {
//   return array.reverse();
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.slice = (array, start = 0, end = array.length) => [...array].reduce((x, y, i) => start <= i && i < end ? x.concat(y) : x, [])

// function slice(array, start = 0, end = array.length) {
//   return array.slice(start,end);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedIndex =

function sortedIndex(array, value) {
  if(array.length == 1) {
    return 0;
  }
  for(i = 0; i < array.length; i++) {
    if(array[1] > array[0] && value <= array[0]) {
      return 0
    } 
    else if(array[1] > array[0] && value > array[array.length - 1]) {
      return array.length;
    }
    else if(array[1] > array[0] && array[i] < value && value <= array[i + 1]) {
      return i + 1;
    }
    else if(array[0] > array[1] && value >= array[0]) {
      return 0;
    } 
    else if(array[0] > array[1] && value < array[array.length - 1]) {
      return array.length;
    }
    else if(array[0] > array[1] && array[i] > value && value >= array[i + 1]) {
      return i + 1;
    }
  } 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedIndexBy = 

function sortedIndexBy(array, value, iteratee) {
  var a = suwei.judge(iteratee);
  if(array.length == 1) {
    return 0;
  }
  for(i = 0; i < array.length; i++) {
    if(a(array[1]) > a(array[0]) && a(value) <= a(array[0])) {
      return 0
    } 
    else if(a(array[1]) > a(array[0]) && a(value) > a(array[array.length - 1])) {
      return array.length;
    }
    else if(a(array[1]) > a(array[0]) && a(array[i]) < a(value) && a(value) <= a(array[i + 1])) {
      return i + 1;
    }
    else if(a(array[0]) > a(array[1]) && a(value) >= a(array[0])) {
      return 0;
    } 
    else if(a(array[0]) > a(array[1]) && a(value) < a(array[array.length - 1])) {
      return array.length;
    }
    else if(a(array[0]) > a(array[1]) && a(array[i]) > a(value) && a(value) >= a(array[i + 1])) {
      return i + 1;
    }
  } 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedIndexOf = 

function sortedIndexOf(array, value) {
  return array.indexOf(value);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedLastIndex =

function sortedLastIndex(array, value) {
  if(array.length == 1) {
    return 1;
  }
  for(i = 0; i < array.length; i++) {
    if(array[1] > array[0] && value < array[0]) {
      return 0
    } 
    else if(array[1] > array[0] && value >= array[array.length - 1]) {
      return array.length;
    }
    else if(array[1] > array[0] && array[i] <= value && value < array[i + 1]) {
      return i + 1;
    }
    else if(array[0] > array[1] && value > array[0]) {
      return 0;
    } 
    else if(array[0] > array[1] && value <= array[array.length - 1]) {
      return array.length;
    }
    else if(array[0] > array[1] && array[i] >= value && value > array[i + 1]) {
      return i + 1;
    }
  } 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedLastIndexBy = 

function sortedLastIndexBy(array, value, iteratee) {
  var a = suwei.judge(iteratee);
  if(array.length == 1) {
    return 1;
  }
  for(i = 0; i < array.length; i++) {
    if(a(array[1]) > a(array[0]) && a(value) < a(array[0])) {
      return 0
    } 
    else if(a(array[1]) > a(array[0]) && a(value) >= a(array[array.length - 1])) {
      return array.length;
    }
    else if(a(array[1]) > a(array[0]) && a(array[i]) <= a(value) && a(value) < a(array[i + 1])) {
      return i + 1;
    }
    else if(a(array[0]) > a(array[1]) && a(value) > a(array[0])) {
      return 0;
    } 
    else if(a(array[0]) > a(array[1]) && a(value) <= a(array[array.length - 1])) {
      return array.length;
    }
    else if(a(array[0]) > a(array[1]) && a(array[i]) >= a(value) && a(value) > a(array[i + 1])) {
      return i + 1;
    }
  } 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedLastIndexOf =

function sortedLastIndexOf(array,value) {
  return array.lastIndexOf(value);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedUniq = 

function sortedUniq(array) {
  return array.reduce((a, b) => a.indexOf(b) == -1 ? a.concat(b) : a, [])
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortedUniqBy =
 
  function sortedUniqBy(array, iteratee) {
    var new_arr = [];
    return array.filter(a => {
      if(new_arr.indexOf(iteratee(a)) == -1) {
        new_arr.push(iteratee(a));
        return true;
      } else {
        return false;
      }
    })
  }

// function sortedUniqBy(array, iteratee) {
//   var new_array.map(iteratee).reduce((a, b) => a.indexOf(b) == -1 ? a.concat(b) : a, [])
//   return array.reduce((a, b) => array.indexOf(iteratee(b)) == -1 ? a.concat(b) ; new_array : , [])
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.tail = (array) => array.reduce((x, y, i) => i !== 0 ? x.concat(y) : x, [])

// function tail(array) {
//   return array.slice(1);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.take = (array, n = 1) => array.reduce((x, y, i) => i < n ? x.concat(y) : x , [])

// function take(array, n = 1) {
//   return array.slice(0, n)
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.takeRight = (array, n = 1) => array.reduce((x, y, i) => i >= array.length - n ? x.concat(y) : x, []) 

// function takeRight(array, n = 1) {
//   return n == 0 ? [] : array.slice(-n);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.takeRightWhile =

function takeRightWhile(array, ...predicate) {
  var a = suwei.judge.apply(null, predicate);
  for(var i = array.length - 1; i >= 0; i--) {
    if(a(array[i]) == false) {
      return array.splice(i + 1);
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.takeWhile = 

function takeWhile(array, ...predicate) {
    var a = suwei.judge.apply(null, predicate);
  for(var i = 0; i < array.length; i++) {
    if(a(array[i]) == false) {
      array.splice(i);
      return array;
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.union = (...arrays) => [...new Set([].concat(...arrays))]

// function union(...array) {
//   return  [].concat(...array).reduce((a, b) => a.indexOf(b) == -1 ? a.concat(b) : a, []);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unionBy =

function unionBy(...arg) {
  var array = Array.from(arg);
  var iteratee = array.pop();
  var a = suwei.judge(iteratee);
  var arr = [].concat(...array);
  var new_arr = [];
  return arr.reduce((x, y) => {if(new_arr.indexOf(a(y)) == -1) {new_arr.push(a(y));return x.concat(y);} else return x}, []);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unionWith = 

function unionWith(...arg) {
  var array = Array.from(arg);
  var comparator = array.pop();
  var arr = [].concat(...array);
  var result = [];
  arr.forEach(x => {
    for(var i = 0; i < result.length; i++) {
      if(comparator(result[i], x)) {
        return;
      }
    }
      result.push(x);
  })
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.uniq = array => [...new Set(array)]

// function uniq(array) {
//   return array.reduce((x, y) => x.indexOf(y) == -1 ? x.concat(y) : x, [])
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.uniqBy = 

function uniqBy(array, iteratee) {
  var a = suwei.judge(iteratee);
  var arr = [];
  return array.reduce((x, y) => {if(arr.indexOf(a(y)) == -1) {arr.push(a(y)); return x.concat(y)} else return x}, []);
} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.uniqWith = 

function uniqWith(array, comparator) {
  var result = [];
  array.forEach(x => {
    for(var i = 0; i < result.length; i++) {
      if(comparator(result[i], x)) {
        return;
      }
    }
      result.push(x);
  })
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unzip = (array) => array[0].map((x, i) => array.reduce((x, y) => x.concat(y[i]), []))

// function unzip(array) {
//   return array[0].map((x, i) => array.reduce((x, y) => x.concat(y[i]), []));
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unzipWith = 

function unzipWith(array, iteratee) {
  var arr = suwei.unzip(array);
  return array[0].map((a, i) => arr[i].reduce(iteratee));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.without = (...arg) => arg.shift().reduce((x, y) => arg.includes(y) ? x : x.concat(y), [])

// function without(...arg) {
//   var array = arg.shift()
//   return array.reduce((x, y) => arg.indexOf(y) == -1 ? x.concat(y) : x, [])
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.xor = (...arg) => arg.reduce((x, y, i) => x.concat(y.reduce((a, b) => arg.every((z, j) => i === j ? true : !z.includes(b)) ? a.concat(b) : a,[])), [])

// function xor(...arg) {
//   var array = Array.from(arg);
//   var arr = [].concat(...array.map((x) => Array.from(new Set(x))));
//   var result = [];
//   var map = new Map();
//   for(let value of arr) {
//     if(map.get(value) == undefined) {
//       map.set(value, 1);
//     } else {var val = map.get(value); map.set(value, ++val);} 
//   }
//   for(let value of arr) {
//     if(map.get(value) == 1) {
//       result.push(value);
//     }
//   }
//   return result;
// }
  


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.xorBy =

function xorBy(...arg) {
  var array = Array.from(arg);
  var iteratee = array.pop();
  var f = suwei.judge(iteratee);
  var arr = [].concat(...array.map((m) => {var a = []; return m.reduce((x, y) => {if(a.indexOf(f(y)) == -1) {a.push(f(y)); return x.concat(y);} else return x;}, [])}));
  var b = [];
  var ary = arr.map(x => f(x));
  return arr.reduce((x, y) => {if(ary.indexOf(f(y)) == ary.lastIndexOf(f(y))) {return x.concat(y)} else return x;}, []);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.xorWith =

function xorWith(...arg) {
  var array = Array.from(arg);
  var comparator = array.pop();
  var arr = [].concat(...(array.map(x => _.uniqWith(x, comparator))));
  var result = [];
  var new_arr = [];
  var amount = 0;
  for(var i = 0; i < arr.length; i++) {
    for(var j = i + 1; j < arr.length; j++) {
      if(comparator(arr[i], arr[j])) {
        new_arr.push(i,j);
      }
    }
  }
  var arr2 = Array.from(new Set(new_arr)).sort();
  
  for(var i = 0; i < arr2.length; i++) {
    arr.splice(arr2[i] - amount, 1);
    amount++;
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.zip = (...arg) => arg[0].map((x, i) => arg.reduce((x, y) => x.concat(y[i]), []))

// function zip(...arg) {
//   //Array.from(arg)
//   return arg[0].map((x, i) => arg.reduce((x, y) => x.concat(y[i]), []));
//}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.zipObject =

function zipObject(props, values) {
  var obj = {}
  for(let i = 0; i < props.length; i++) {
    obj[props[i]] = values[i];
  }
  return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.zipObjectDeep = (prop, values) => prop.reduce((x, y, i) => suwei.set(x, y, values[i]), {});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.zipWith = 

function zipWith(...arg) {
  var array = Array.from(arg);
  var iteratee = array.pop();
  return array[0].map((x, i) => iteratee.apply(null, array.reduce((a, b) => a.concat(b[i]), [])));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////Collection//////////////////////////////////////////////


suwei.countBy = 

function countBy(collection, something){
  var object = {};
  var accept;
  if(typeof something == "function") {

    for(keys in collection) {
      accept = something(collection[keys])
      if(accept in object) {
        object[accept]++;
      }
      else {
        object[accept] = 1;
      }
    }
  } else if(typeof something == "string") {
      for(keys in collection) {
        accept = collection[keys][something];
      if(accept in object) {
        object[accept]++;
      }
      else {
        object[accept] = 1;
      }
    }
  }
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.each = 

function each(collection, something){
  for(key in collection) {
    if(false === something(collection[key], key, collection)){
      break;
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.eachRight =

function eachRight(collection, iteratee) {
  if(collection instanceof Array) {
    for(i = collection.length - 1; i >= 0; i--) {
      if(false === iteratee(collection[i], i, collection)) {
        break;
      }
    }
  } else {
    for(key in collection) {
      if(false === iteratee(collection[key], key, collection)) {
        break;
      }
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.every =

function every(collection, iteratee) {
  var f = suwei.judge(iteratee);
  for(key in collection) {
    if(f(collection[key], key, collection) === false) {
      return false;
    }
  }
  return true;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.filter =

function filter(collection, iteratee) {
  var f = suwei.judge(iteratee);
  var arr = [];
  for(key in collection) {
    if(f(collection[key], key, collection) == true) {
      arr.push(collection[key]);
    }
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.find = 

function find(collection, iteratee, fromIndex = 0) {
  var f = suwei.judge(iteratee);
  for(var i = fromIndex; i < collection.length; i++) {
    if(f(collection[i], i, collection) == true) {
      return collection[i];
    }
  }
  return undefined;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.findLast =

function findLast(collection, iteratee, fromIndex = collection.length - 1) {
  var f = suwei.judge(iteratee);
  for(var i = fromIndex; i >= 0; i--) {
    if(f(collection[i], i, collection) == true) {
      return collection[i];
    }
  }
  return undefined;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flatMap =

function flatMap(collection, iteratee) {
  var f = suwei.judge(iteratee);
  var result = [];
  for(i in collection) {
    result = result.concat(f(collection[i]));
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flatMapDeep = (collection, iteratee) => suwei.flattenDeep(suwei.flatMap(collection, iteratee));

// function flatMapDeep(collection, iteratee) {
//   return suwei.flattenDeep(suwei.flatMap(collection, iteratee));
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flatMapDepth = (collection, iteratee) => suwei.flattenDepth(suwei.flatMap(collection, iteratee))


// function flatMapDepth(collection, iteratee) {
//   return suwei.flattenDepth(suwei.flatMap(collection, iteratee))
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forEach =

function forEach(collection, iteratee) {
  var f = suwei.judge(iteratee);
  for(i in collection) {
    if(f(collection[i], i, collection) == false) break;
  }
  return collection;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forEachRight =

function forEachRight(collection, iteratee) {
  var f = suwei.judge(iteratee);
  if(Array.isArray(collection) === true) collection.reverse();
  for(i in collection) {
    if(f(collection[i], i, collection) == false) break;
  }
  return collection.reverse();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.groupBy =

function groupBy(collection, iteratee) {
  var obj = {};
  var f = suwei.judge(iteratee);
  for(i in collection) {
    if(f(collection[i]) in obj) {
      obj[f(collection[i])].push(collection[i]);
    } else {
      obj[f(collection[i])] = [collection[i]];
    }
  }
  return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.includes =

function includes(collection, value, fromIndex = 0) {
  if(Object.prototype.toString.call(collection) == "[object Object]") {
    for(key in collection) {
      if(collection[key] == value) {
        return true;
      }
    }
  } else {
    return collection.indexOf(value, fromIndex) == -1 ? false : true;
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.invokeMap =

function invokeMap(collection, path, args) {
//   var arr = [];
//   if(Object.prototype.toString.call(path) == "[object String]") {
//     for(key in collection) {

//     }
//   }

//   else{
//     for(key in collection) {
//       arr.push(path.call(collection[key]), args); 
//     }
//     return arr;
//   } 
// }
  if(typeof path == "string") return collection.map(x => x[path].call(x, args));
  else if(typeof path == "function") return collection.map(x => path.call(x, args));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.keyBy =

function keyBy(collection, iteratee) {
  var f = suwei.judge(iteratee);
  var obj = {};
  collection.forEach(x => obj[f(x)] = x);
  return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.map =

function map(collection, iteratee) {
  var arr = [];
  var f = suwei.judge(iteratee);
  for(key in collection) {
    arr.push(f(collection[key], +key, collection))
  }
  return arr;
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.orderBy =

// function orderBy(collection, iteratee, orders) {
//   for(let i = iteratee.length - 1; i >= 0; i--){
//     if(order != undefined && orders[i] == "desc") {
//       collection.sort((a,b) => {if(typeof a[iteratee[i]] == "number") {return a[iteratee[i]] - b[iteratee[i]];} else {return undefined});
//       collection.reverse();
//     }
//     else collection.sort((a,b) => {if(typeof a[iteratee[i]] == "number") return a[iteratee[i]] - b[iteratee[i]] else return undefined});
//   }
// }


function orderBy(collection, iteratee, orders) {
  for(let i = iteratee.length - 1; i >= 0; i--){
      collection.sort((a,b) => {if(typeof a[iteratee[i]] == "number") {return a[iteratee[i]] - b[iteratee[i]]} else {if(a[iteratee[i]] < b[iteratee[i]]) {return -1} else if(a[iteratee[i]] > b[iteratee[i]]) {return 1} else {return 0}}});
    if(orders != undefined && orders[i] == "desc") {
      collection.reverse();
    }
  }
  return collection;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.partition = 

function partition(collection, predicate) {
  var truthy = [], falsey = [];
  var f = suwei.judge(predicate);
  collection.forEach(x => {if(f(x) == true) truthy.push(x); else if(f(x) == false) falsey.push(x)});
  return [truthy, falsey];
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.reduce =

function reduce(collection, iteratee, accmulator) {
  var f = suwei.judge(iteratee);
  var flag = true;
  for(key in collection) {
    if(accmulator == undefined && flag == true) {
      accmulator = collection[key];
      flag = false;
    } else {
      accmulator = f(accmulator, collection[key], key, collection);
    }
  }
  return accmulator;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.reduceRight =

function reduceRight(collection, iteratee, accmulator) {
  var keys = Object.keys(collection);
  var i = keys.length - 1;
  var f = suwei.judge(iteratee);
  if(accmulator == undefined) {
    accmulator = collection[keys[i]];
    i--;
  }
  for(; i >= 0; i--){
    accmulator = f(accmulator, collection[keys[i]], i, collection);
  }
  return accmulator;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.reject =

function reject(collection, predicate) {
  var f = suwei.judge(predicate);
  return collection.reduce((x, y) => f(y) == true ? x : x.concat(y), [])
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sample = 

function sample(collection) {
  let arr = [];
  for(key in collection) {
    arr.push(collection[key]);
  }
  let length = arr.length;
  return arr[Math.random() * length | 0];
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sampleSize = 

function sampleSize(collection, n = 1) {
  let arr = [];
  let result = [];
  for(let key in collection) {
    arr.push(collection[key]);
  }
  let length = n > arr.length ? arr.length : n
  for(let i = 0; i < length; i++) {
    Array.prototype.push.apply(result,arr.splice(Math.random() * arr.length | 0, 1))
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.shuffle =

function shuffle(collection) {
  return suwei.sampleSize(collection, collection.length - 1)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.size = 

function size(collection) {
  return typeof collection == "object" ? Object.keys(collection).length: collection.length;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.some =

function some(collection, predicate) {
  var f = suwei.judge(predicate);
  for(key in collection) {
    if(f(collection[key]) == true) return true;
  }
  return false;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sortBy =

function (collection, iteratee) {
  
}





// function sortBy(collection, iteratee, orders) {
//   if(arguments.length == 3) {iteratee = order}
//   for(let i = iteratee.length - 1; i >= 0; i--){
//       collection.sort((a,b) => {if(typeof a[iteratee[i]] == "number") {return a[iteratee[i]] - b[iteratee[i]]} else {if(a[iteratee[i]] < b[iteratee[i]]) {return -1} else if(a[iteratee[i]] > b[iteratee[i]]) {return 1} else {return 0}}});
//     if(orders != undefined && orders[i] == "desc") {
//       collection.reverse();
//     }
//   }
//   return collection;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Date/////////////////////////////////////////////////////////////////////////////


suwei.now = 

function() {
  var time = new Date();
  return time.getTime();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Function///////////////////////////////////////////////////////////////////


suwei.after = 

function after(n, func) {
  if(typeof func != "function") throw new TypeError("Only allowed Function");
  return function() {
    if(--n < 1) {
      return func.apply(this, arguments);
    } 
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.ary = 

function ary(func, length) {
  return function(...arg) {
    arg.length = arg.length > length ? length : arg.length;
    return func.apply(this, arg);
  }
}

function ary(func, length) {
  return function(...arg) {
    return func.apply.call(this, arg.slice(0, length + 1))
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.before =

// function before(n, func) {
//   var last;
//   return function() {
//     if(n == 1) {
//       last = func.apply(this, arguments)
//     }
//     if(--n > 0) {
//       return func.apply(this, arguments)
//     } else {
//       return last;
//     }
//   }
// }


function before(n, func) {
  var last;
  return function() {
    if(n == 0) last = func.apply(this, arguments);
    if(--n > 0) {
      return func.apply(this, arguments)
    } else return last;
  }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.bind =

function bind(func, thisArg, ...arg) {
  return function(...rest) {
    var result = arg.reduce ((x, y) => {if(y === _) return x.concat(rest.shift()); else return x.concat(y)},[]).concat(rest);
    return func.apply(thisArg, result);
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.bindKey =

function bindKey(object, key, ...arg) {
  return function(...rest) {
    return object[key].call(object, ...arg, ...rest);
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.curry =

function curry(func, arity = func.length) {
  var arr = [];
  return function a(...arg) {
    arr = arr.concat(arg.reduce((x, y) => y != "_" ? x.concat(y) : x, []));
    if(arr.length < arity) {
      return a;
    } else return func(...arr);
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.curryRight


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.debounce =

function debounce(fn, duration = 0, {leading = false, 
                                     trailing = true,
                                     maxWait
                                    } = {}        ) {
  var time
  return function(...args) {
    // leading === true && fn(...args);
    duration = maxWait === undefined ? duration : Math.min(maxWait, duration);
    var id = setTimeout(fn, duration, ...args);
    if(Date.now() - time > duration && leading === true) {fn(...args); clearTimeout(id)} 
    else if(Date.now() - time < duration || !trailing) {
      clearTimeout(id);
    }
    time = Date.now();
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.defer = 

function defer(func, ...args) {
  return setTimeout(func.apply(null, args)) - 1;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.delay = 

function delay(func, wait, ...args) {
  return setTimeout(func.apply(null, args), wait) - 1;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flip = func => (...x) => func(...(x.reverse()));

// function flip(func) {
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.memoize = 

function memoize(fn, resolver) {
  var a = function(...args) {
    var key = resolver ? resolver(...args) : args.join("-");
    if(key in a.cache) return a.cache[key];
    return a.cache[key] = fn.apply(this, args); 
  }
  a.cache = {};
  return a;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.negate = predicate => (...arg) => !predicate(...arg);

// function negate(predicate) {
//   return function(...arg) {
//     return !predicate.apply(this,arg)
//   }
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.once = (f, flag = true, result) => (...arg) => flag ? (flag = false, result = f(...arg)) : result; 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.overArgs


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.partial


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.partialRight


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.rearg


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.rest


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.spread = (func, start) => arg => func(...(arg.slice(start)));

// function spread(func, start = 0) {
//   return function(arg) {
//     return func(...(arg.slice(start)));
//   }

// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.throttle =

function() {
  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unary = func => x => func(x);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.wrap


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////Lang/////////////////////////////////////////////////////


suwei.castArray = 

function castArray(value) {
  if(arguments.length == 0) {
    return [];
  }
  return Array.isArray(value) ? value : [value]; 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.clone = 

function clone(value) {
  return value;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.cloneDeep =

function cloneDeep(value) {
  var result;
  if(typeof value !== "object" || value === null) return value;
  else if (Array.isArray(value)) result = [];
  else if (typeof value === "object") result = {};
  for(var key in value) {
    result[key] = cloneDeep(value[key])
  } 
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.cloneDeepWith =

function cloneDeepWith(value, customizer) {
  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.cloneWith =

function cloneWith(value, customizer) {
  var result;
  if(!customizer) return this.clone(value);
  if(customizer(value) === undefined)
  if(typeof customizer(value) !== "object" || customizer(value) === "null") return customizer(value);
  if(Array.isArray(customizer(value))) result = [];
  if(typeof value === "object") result = {};
  for(var key in customizer(value)) {
    result[key] = customizer(value[key], key, value, stack)[key];
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.conformsTo =

function conformsTo(object, source) {
  for(key in object) {
    if(source[key] && source[key](object[key]) == true) {
      return true;
    }
  }
  return false;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.eq =

function eq(value, other) {
  if(value != value && other != other) return true;
  return value === other;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.gt =

function gt(value, other) {
  return value > other;
} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.gte = 

function gte(value, other) {
  return value >= other;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


"Arguments|Array|ArrayBuffer|Function|Boolean|Buffer|Date|HTMLBodyElement|Map|Object|String|RegExp|Error|Number|Function|WeakSet|WeakMap|Uint8Array|Symbol|Set"
.split("|").forEach(x => suwei["is" + x] = value => ({}).toString.call(value) === `[object ${x}]`);






// suwei.isArguments =

// function isArguments(value) {
//   return Object.prototype.toString.call(value) == "[object Arguments]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isArray =

// function isArray(value) {
//   return Object.prototype.toString.call(value) == "[object Array]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isArrayBuffer =

// function isArrayBuffer(value) {
//   return Object.prototype.toString.call(value) == "[object ArrayBuffer]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isArrayLike = value => value.length < Number.MAX_SAFE_INTEGER && value.length >= 0 && !suwei.isFunction(value);

// function isArrayLike(value) {
//   return value.length < Number.MAX_SAFE_INTEGER && value.length >= 0 && Object.prototype.toString.call(value) != "[object Function]"
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isArrayLikeObject =

function isArrayLikeObject(value) {
  return suwei.isArrayLike(value) && typeof value == "object";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isBoolean =

// function isBoolean(value) {
//   return Object.prototype.toString.call(value) == "[object Boolean]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isBuffer =

// function isBuffer(value) {
//   return Object.prototype.toString.call(value) == "[object Buffer]";
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isDate =

// function isDate(value) {
//   return Object.prototype.toString.call(value) == "[object Date]"
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isElement =

function isElement(value) {
  return Object.prototype.toString.call(value) == "[object HTMLBodyElement]"
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isEmpty =

function isEmpty(value) {
  switch(true) {
    case this.isArray(value) && value.length != 0: return false;
    case this.isMap(value) && value.size != 0: return false;
    case this.isObject(value) && Object.keys(value).length != 0: return false;
    case this.isString(value) && value.length != 0: return false;
    default: return true;
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isEqual =

function isEqual(value, other) {
  if(value === other) return true;
  if(({}).toString.call(value) != ({}).toString.call(other)) return false;
  if ((typeof value == "object" || typeof value == "array") && value != "null") {
    var keys = Object.keys(value);
    var length = keys.length;
    if(length != Object.keys(other).length) return false;
    while(length--) {
      if(!this.isEqual(value[keys[length]], other[keys[length]])) return false;
    }
  } else if (({}).toString.call(value) == "[object RegExp]") return value.toString() === other.toString();
  else {
    return value === other;
  }
  return true;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isEqualWith =

function isEqualWith(value, other, fn) {
  if(value === other) return true;
  if(({}).toString.call(value) != ({}).toString.call(other)) return false;
  if ((typeof value == "object" || typeof value == "array") && value != "null") {
    var keys = Object.keys(value);
    var length = keys.length;
    if(length != Object.keys(other).length) return false;
    while(length--) {
      if(!this.isEqualWith(fn(value[keys[length]]), fn(other[keys[length]]))) return false;
    }
  } else if (({}).toString.call(value) == "[object RegExp]") return value.toString() === other.toString();
  else {
    return fn(value,other) === fn(other,value);
  }
  return true;
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isError = 

// function isError(value) {
//   return Object.prototype.toString.call(value) == "[object Error]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isFinite = 

function isFinite(value) {
  return Math.abs(value) < Infinity && typeof value == "number";
} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isFunction = 

// function isFunction(value) {
//   return Object.prototype.toString.call(value) == "[object Function]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isInteger =

function isInteger(value) {
  return typeof value == "number" && Math.floor(value) === value && isFinite(value);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isLength =

function isLength(value) {
  return this.isInteger(value) && value >= 0;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

suwei.kindOf = function kindOf(value) {
  return Object.prototype.toString.call(value);
}


// suwei.isMap =

// function isMap(value) {
//   return this.kindOf(value) == "[object Map]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isMatch =

function isMatch(object, source) {
  return Object.keys(source).every(a => this.isEqual(object[a], source[a]));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isMatchWith =

function isMatchWith(object, source, fn) {
  return Object.keys(source).every(a => this.isEqualWith(object[a], source[a], fn));
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isNaN =

function isNaN(value) {
  return (typeof value === "number" || value instanceof Number) && value.toString() === "NaN";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isNative = value => !!~value.toString().indexOf(" [native code] ")

// function isNative(value) {
//   return !!~value.toString().indexOf(" [native code] ");
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isNil = value => value == undefined;

// function isNil(value) {
//   return value == undefined;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isNull = value => value === null;

// function isNull(value) {
//   return value === null;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isNumber =

// function isNumber(value) {
//   return this.kindOf(value) == "[object Number]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isObject = value => (typeof value == "object" || typeof value == "function") && value != null

// function isObject(value) {
//   return (typeof value == "object" || typeof value == "function") && value != null;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isObjectLike = value => typeof value == "object" && value != null;

// function isObjectLike(value) {
//   return typeof value == "object" && value != null;
// }
 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isPlainObject = value => value.constructor == Object || value.__proto__ == null;

// function isPlainObject(value) {
//   return value.constructor == Object || value.__proto__ == null;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isRegExp =

// function isRegExp(value) {
//   return this.kindOf(value) == "[object RegExp]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isSafeInteger = value => suwei.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;

// function isSafeInteger(value) {
//   return suwei.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isSet = 

// function isSet(value) {
//   return this.kindOf(value) == "[object Set]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isString =

// function isString(value) {
//   return this.kindOf(value) == "[object String]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isSymbol =

// function isSymbol(value) {
//   return this.kindOf(value) == "[object Symbol]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isTypedArray = value => suwei.kindOf(value) === "[object Uint8Array]";

// function isTypedArray(value) {
//   return this.kindOf(value) === "[object Uint8Array]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.isUndefined = value => value === undefined;

// function isUndefined(value) {
//   return value === undefined;
// } 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isWeakMap =

// function isWeakMap(value) {
//   return this.kindOf(value) == "[object WeakMap]";
// }


// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// suwei.isWeakSet =

// function isWeakSet(value) {
//   return this.kindOf(value) == "[object WeakSet]";
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.lt = (value, other) => value < other;

// function lt(value, other) {
//   return value < other;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.lte = (value, other) => value <= other;

// function lte(value, other) {
//   return value <= other;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

suwei.toArray = 

function toArray(value) {
  var arr = [];
  for(key in value) {
    arr.push(value[key])
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toFinite =

function toFinite(value) {
  if(value >= 1.7976931348623157e+308) {
    return 1.7976931348623157e+308;
  } else if(value <= -1.7976931348623157e+308) {
    return -1.7976931348623157e+308;
  } else if(0 < value && value < 5e-324) {
    return 5e-324;
  } else if(value < 0 && value > -5e-324) {
    return -5e-324;
  } else return parseFloat(value);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toInteger = value => Math.floor(suwei.toFinite(value));

// function toInteger(value) {
//   return Math.floor(this.toFinite(value));
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toLength = value => suwei.toInteger(value) > 4294967295 ? 4294967295 : suwei.toInteger(value);

// function toLength(value) {
//   return this.toInteger(value) > 4294967295 ? 4294967295 : this.toInteger(value);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toNumber = value => Number(value);

// function toNumber(value) {
//   return Number(value);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toPlainObject =

function toPlainObject(value) {
  var obj = {};
  for(var key in value) {
    obj[key] = value[key];
  }
  return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toSafeInteger =

function toSafeInteger(value) {
  if(value > 9007199254740991) return 9007199254740991;
  else if(value < -9007199254740991) return -9007199254740991;
  return this.toInteger(value);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toString = value => value.toString();

// function toString(value) {
//   return value.toString();
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Math//////////////////////////////////////////////////////////


suwei.add = (x, y) => x + y;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.ceil = (number, pos = 0) => Math.ceil(number * Math.pow(10, pos)) / Math.pow(10,pos);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.divide = (dividend, divisor) => dividend / divisor;



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.floor = (number, pos = 0) => Math.floor(number * Math.pow(10, pos)) / Math.pow(10,pos);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.max = array => array.length == 0? undefined : Math.max.apply(null, array);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.maxBy = function maxBy(array, iteratee) {
  var max = array[0];
  if(typeof iteratee == "function"){
    for(var i = 0; i < array.length; i++) {
      if(iteratee(array[i]) > iteratee(max)) {
        max = array[i];
      }
    }
  }   else if(typeof iteratee == "string") {
    for(var i = 0; i < array.length; i++) {
      if(suwei.property(iteratee)(array[i]) > suwei.property(iteratee)(max)) {
        max = array[i];
      }
    }
  }
  return max;
}


//   else if(typeof iteratee == "string") {
//     for(i = 0; i < array.length; i++) {
//       if(array[i][iteratee] > max[iteratee]) {
//         max = array[i];
//       }
//     }
//   }
//   return max;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.mean = array => array.reduce((a, b) => a + b) / array.length;

// function mean(array) {
//   //array.reduce((a,b) => (a + b) / i * (i - 1))
//   return array.reduce((a, b) => a + b) / array.length;
// }


suwei.matches = target => source => suwei.isMatch(target, source);

// function matches(target) {
//   var self = this;
//   return function(source) {
//     return self.isMatch(target, source);
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.meanBy = function meanBy(array, iteratee) {
  var sum = 0;
  if(typeof iteratee == "function") {
    for(i = 0; i < array.length; i++) {
      sum = sum + iteratee(array[i]);
    }
  }
  else if(typeof iteratee == "string") {
    for(var i = 0; i < array.length; i++) {
      sum = sum + suwei.property(iteratee)(array[i]);
    }
  }
  return sum / array.length;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.min = array => array.length === 0 ? undefined : Math.min(...array);

// function min(array) {
//   return array.length === 0 ? undefined : Math.min(...array);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.minBy =

function minBy(array, iteratee) {
  var min = array[0];
  if(typeof iteratee == "function") {
    for(i = 0; i < array.length; i++) {
      min = iteratee(array[i]) > iteratee(min) ? min : array[i]; 
    }
  } else if (typeof iteratee == "string") {
    for(i = 0; i < array.length; i++) {
      min = suwei.property(iteratee)(array[i]) > suwei.property(iteratee)(min) ? min : array[i];
    }
  }
  return min;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.multiply = (x, y) => x * y

// function multiply(x, y) {
//   return x * y;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.round = (number, pos = 0) => Math.round(number * 10 ** pos) / 10 ** pos;

// function round(number, pos = 0) {
//   return Math.round(number * 10 ** pos) / 10 ** pos;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.subtract = (minuend, subtrahend) => minuend - subtrahend;



// function subtract(minuend, subtrahend) {
//   return minuend - subtrahend;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sum = array => array.reduce((a, b) => a + b);


// function sum(array) {
//   return array.reduce((a, b) => a + b);
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.sumBy =

function sumBy(array, iteratee) {
  var sum = 0;
  if(typeof iteratee == "function") {
    for(let i = 0; i < array.length; i++) {
      sum = sum + iteratee(array[i]);
    }
  } else if (typeof iteratee == "string") {
    for(let i = 0; i < array.length; i++) {
      sum = sum + suwei.property(iteratee)(array[i]);
    }
  }
  return sum;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Number/////////////////////////////////////////////////


suwei.clamp = (...args) => args.length < 2 ? args.sort((a, b) => a - b)[0] : args.sort((a, b) => a - b)[1];

// function clamp(number, lower, upper) {
//   result_arr = Array.from(arguments).sort((a, b) => a - b) ;
//   return result_arr[1];
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.inRange =

function inRange(number, start, end){
  if(arguments.length == 2) {
    end = arguments[1] 
    start = 0;
  }

  if((number > start && number < end) || (number > end && number < start)){
    return true;
  }
  else{return false;}
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.random = 

function random(lower, upper, floating) {
    var rand = Math.random() 
    if(lower !== 0 && upper == undefined){ return rand * lower | 0}
    else if(lower !== 0 && typeof upper == "boolean") {
    return upper == true ?  rand * lower : rand * lower | 0; 
  } else if ((lower | 0) == lower && (upper | 0) == upper){
    return floating == true ?  lower + rand * (upper - lower) : (lower + rand * (upper - lower)) | 0;
  } else return lower + rand * (upper - lower);
}










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Object/////////////////////////////////////////////////


suwei.assign = 

function assign(object, ...source){
  return source.reduce((a, b) => {
    for(key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
      return a  
  }, object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.assignIn =

function assignIn(object, ...source){
  return source.reduce((a, b) => {
    for(key in b) {
      a[key] = b[key];
    }
    return a  
  }, object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.assignInWith =

function assignInWith(object, source ) {}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.assignWith 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.at = 

function at(object, paths) {
  return paths.map(x => suwei.get(object, x));
}
 
suwei.at
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.create =

function create(prototype, properties) {
  //var obj = {}
  for(key in properties) {
    prototype[key] = properties[key];
  }
  
  function A() {};
  A.prototype = prototype;
  return new A();

  // obj.__proto__ = prototype;
  // return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.defaults =

function defaults(object, ...source) {
  return source.reduce((a, b) => {
    for(key in b) {
      if(a[key] == undefined) {
        a[key] = b[key];
      }
    }
    return a;
  } ,object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.defaultsDeep =

function defaultsDeep(object, ...source) {
  return source.reduce((a, b) => {
    for(var key in b) {
      if(typeof b[key] == "object") {
        defaultsDeep(a[key], b[key])
      }
      if(a[key] == undefined) {
        a[key] = b[key];
      }
    }
    return a;
  } ,object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toPairs = 

function toPairs(object) {
  var arr = [];
  for(key in object) {
    if(object.hasOwnProperty(key)) {
      arr.push([key, object[key]]);
    }
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




suwei.toPairsIn = 

function toPairsIn(object) {
  var arr = [];
  for(key in object) {
      arr.push([key, object[key]]);
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//suwei.extend.assignIn


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.extendWith


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.findKey = 

function findKey(object, predicate) {
  var f = this.judge(predicate);
  for(key in object) {
    if(f(object[key]) == true) {
      return key;
    }
  }
  return undefined;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.findLastKey =

function findLastKey(object, predicate) {
  var f = this.judge(predicate);
  var arr = [];
  for(key in object) {
    arr.push(key);
  }
  for(i = arr.length - 1; i >= 0; i--) {
    if(f(object[arr[i]]) == true) {
      return arr[i];
    }
  }
  return undefined;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forIn =

function forIn(object, iteratee) {
  var f = this.judge(iteratee);
  for(key in object) {
    if(f(object[key], key, object) == false){
      break;
    }
  }
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forInRight =

function forInRight(object, iteratee) {
  var f = this.judge(iteratee);
  var arr = [];
  for(key in object) {
    arr.push(key);
  }
  for(var i = arr.length - 1; i >= 0; i--) {
    if(f(object[arr[i]], arr[i]) == false) {
    }
  }
  return object; 
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forOwn =

function forOwn(object, iteratee) {
  var f = this.judge(iteratee)
  for(key in object) {
    if(object.hasOwnProperty(key)) {
      if(f(object[key], key) == false) {
        break;
      }
    } 
  }
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.forOwnRight =

function forOwnRight(object, iteratee) {
  var f = this.judge(iteratee);
  var arr = [];
  for(key in object) {
    if(object.hasOwnProperty(key)) {
      arr.push(key);
    }
  }
  for(var i = arr.length - 1; i >= 0; i--) {
    if(f(object[arr[i]], arr[i]) == false) {
      break;
    } 
  }
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.functions =

function functions(object) {
  var arr = [];
  for(key in object) {
    if(object.hasOwnProperty(key) && typeof object[key] == "function")
    arr.push(key);
  }
  return arr;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.functionsIn =

function functionsIn(object) {
  var arr = [];
  for(key in object) {
    if(typeof object[key] == "function") {
      arr.push(key);
    }
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.get =

function get(object, path, value) {
  var path_arr = Array.isArray(path) ? path : path.split("]").join("").split("[").join(".").split(".");
  return path_arr.reduce((a, b) => {
    if(a === undefined) {
      return undefined;
    }else{return a[b]}}, object) || value;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.has = /*(object, path) => this.toPath(path).reduce((x, y, i) => x.hasOwnProperty(y) && x[y] , object)

function has(object, path) {
  var path = Array.isArray(path) ? path : path.split("]").join("").split("[").join(".").split(".");
  return path.reduce((x, y) => x === false ? false : x.hasOwnProperty(y) && x[y], object) === false ? false : true;
*/
function(object, path) {
  var path = this.toPath(path);
  var x = object;
  for(var i = 0; i < path.length; i++) {
    if(x.hasOwnProperty(path[i])) x = x[path[i]];
    else return false;
  }
  return true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.hasIn =

function has(object, path) {
  var path = Array.isArray(path) ? path : path.split("]").join("").split("[").join(".").split(".");
  return path.reduce((x, y) => {
    return x === false || x[y] === undefined ? false : x[y];
  }, object) === false ? false : true;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.invert =

function invert(object) {
  var arr = [];
  for(var key in object) {
    arr.push([object[key], key]);
  }
  return arr.reduce((a, b) => {
                                a[b[0]] = b[1];
                                return a;
                              } , {})
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.invertBy =

function invertBy(object, iteratee) {
  if(arguments.length == 1) {
    iteratee = a => a;
  }
  var f = suwei.judge(iteratee);
  var arr = [];
  for(var key in object) {
    arr.push([f(object[key]), key]);
  }
  return arr.reduce((a, b) => {if(a[b[0]] == undefined) {
                                  a[b[0]] = [b[1]]; 
                                }
                                else{
                                  a[b[0]].push(b[1]);
                                }
                                return a;
                              } , {})
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.invoke = 

function invoke(object, path, ...args) {
  path = Array.isArray(path) ? path : path.split("]").join("").split("[").join(".").split(".");
  if(this.hasIn(object, path) == false){return "Can't read this path."}
  return args.length == 0 ? path.reduce((x, y) => x[y], object) : path.reduce((x, y, i) => {
                                                                    if(i == path.length - 1) return x[y](...args);
                                                                    return x[y];
                                                                  }, object)
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.keys = Object.keys

// function keys(object) {
//   var arr = [];
//   for(key in object) {
//     if(object.hasOwnProperty(key)) {
//       arr.push(key);
//     }
//   }
//   return arr;
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.keysIn = 

function keysIn(object) {
  var arr = [];
  for(var key in object) {
      arr.push(key);
  }
  return arr;  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.mapKeys =

function mapKeys(object, iteratee) {
  let f = suwei.judge(iteratee);
  let obj = {};
  for(key in object) {
    if(object.hasOwnProperty(key)) {
      obj[f(object[key], key)] = object[key];
    }
  }
  return obj;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.mapValues = 

function mapValues(object, iteratee) {
  var f = suwei.judge(iteratee);
  return Object.keys(object).reduce((a, b) => {a[b] = f(object[b]); return a}, {});
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.merge =

function merge(object, ...source) {
  return source.reduce((a, b) => {
           return Object.keys(b).reduce((x, y) => {
             if(typeof b[y] !== "object") x[y] = b[y];
             merge(x[y], b[y]);
             return x;
          } 
           ,a)
         }, object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.mergeWith =

function mergeWith(object, ...source) {
  return source.reduce((a, b) => {
           return Object.keys(b).reduce((x, y) => {
             if(typeof b[y] !== "object") x[y] = b[y];
             mergeWith(x[y], b[y]);
             return x;
          } 
           ,a)
         }, object)
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.omit =  (object, arr) => Object.keys(object).reduce((a, b) => arr.indexOf(b) === -1 && (a[b] = object[b]) ? a : a , {});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.omitBy = (object, predicate) => Object.keys(object).reduce((a, b) => predicate(object[b], b) === false && (a[b] = object[b]) ? a : a , {});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pick = (object, arr) => arr.reduce((a, b) => {a[b] = object[b]; return a}, {});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pickBy =

function pickBy(object, predicate) {
  let f = suwei.judge(predicate);
  return Object.keys(object).reduce((a, b) => {if(f(object[b], b) === true) {a[b] = object[b]} return a}, {})
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.result = 

function result(object, path, defaultvalue) {
  var value = this.get(object, path, defaultvalue);
  return this.isFunction(value) ? value.bind(this)() : value;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.set =

function set(object, path, value) {
  // path = (Array.isArray(path) && path) ||  path.split("]").join("").split("[").join(".").split(".");
  path = this.toPath(path);
  function change(obj, index = 0, value) {
    if(index >= path.length - 1) {
      obj[path[index]] = value;
      return obj;   
    }
    if(path[index] in obj) {
      return change(obj[path[index]], ++index, value);
    } else if (!isNaN(+path[index + 1])) {
      obj[path[index]] = [];
      return change(obj[path[index]], ++index, value);
    } else {
      obj[path[index]] = {};
      return change(obj[path[index]], ++index, value);
    }
  
  }   
  change(object, 0, value);
  return object;
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.setWith =

function setWith(object, path, value, customizer) {
  // path = (Array.isArray(path) && path) ||  path.split("]").join("").split("[").join(".").split(".");
  path = this.toPath(path);
  function change(obj, index = 0, value) {
    if(index >= path.length - 1) {
      obj[path[index]] = value;
      return obj;   
    }
    if(path[index] in obj) {
      return change(obj[path[index]], ++index, value);
    } else {
      obj[path[index]] = new customizer;
      return change(obj[path[index]], ++index, value);
    }
  
  }   
  change(object, 0, value);
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.transform = 

function(object, iteratee, accumulator) {
  accumulator = accumulator || new ((Function("return " + this.kindOf(object).match(/\b\w+(?=])/)[0]))());
  for(key in object) {
    if(iteratee(accumulator, object[key], key, object) === false) {
      break;
    }
  }
  return accumulator;
} 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unset =

function(object, path) {
  var path = Array.isArray(path) ? path: path.match(/\w+/g);
  var needle = object;
  for(var i = 0; i < path.length - 1; i++) {
    if((needle = needle[path[i]]) === undefined) return false; 
  }
  return delete needle[path[i]];
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.update =

function(object, path, updater) {
  path = this.toPath(path);
  function change(obj, index = 0) {
    if(index >= path.length - 1) {
      obj[path[index]] = updater(obj[path[index]]);
      return obj;   
    }
    if(path[index] in obj) {
      return change(obj[path[index]], ++index);
    } else if (!isNaN(+path[index + 1])) {
      obj[path[index]] = [];
      return change(obj[path[index]], ++index);
    } else {
      obj[path[index]] = {};
      return change(obj[path[index]], ++index);
    }
  
  }   
  change(object, 0);
  return object;

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.updateWith =

function(object, path, updater, customizer) {
   path = this.toPath(path);
  function change(obj, index = 0) {
    if(index >= path.length - 1) {
      obj[path[index]] = updater(obj[path[index]]);
      return obj;   
    }
    if(path[index] in obj) {
      return change(obj[path[index]], ++index);
    } else {
      obj[path[index]] = new customizer;
      return change(obj[path[index]], ++index);
    }
  
  }   
  change(object, 0);
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.values = 

function values(object) {
  var arr = [];
  for(key in object) {
    if(object.hasOwnProperty(key)) {
      arr.push(object[key]);
    }
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.valuesIn =

function keys(object) {
  var arr = [];
  for(key in object) {
      arr.push(object[key]);
  }
  return arr;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Seq ///////////////////////////////////////////////////



suwei.chain


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.tap


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.thru


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
suwei.prototype[Symbol.iterator]


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.at


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.chain


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.commit


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.next 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.plant 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.reverse 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.toJSON 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.value 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.prototype.valueOf 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



*/
///String///////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.camelCase =

function camelCase(str) {
  // var lower_str = str.toLowerCase();
  // var str2 = lower_str.replace(/[^a-z]+[a-z]/g, x => x.slice(-1).toUpperCase()).replace(/[^A-Za-z]*/g, "");
  // return str2.slice(0, 1).toLowerCase() + str2.slice(1); 
  return str.match(/[a-zA-Z0-9]+/g).reduce((a, b, i) => i == 0 ? a + b.toLowerCase() : a + b.slice(0, 1).toUpperCase() + b.slice(1).toLowerCase(), "")
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.capitalize =

  // var str_lower = str.toLowerCase() 
  // return str_lower[0].toUpperCase() + str_lower.slice(1);
function capitalize(str) {
  return str.replace(/^(\w)(.*)/g, (m, a, b) => a.toUpperCase() + b.toLowerCase())
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.deburr =


function deburr(str) {
var convert = {
            "c0": "A",
            "c1": "A",
            "c2": "A",
            "c3": "A",
            "c4": "A",
            "c5": "A",
            "e0": "a",
            "e1": "a",
            "e2": "a",
            "e3": "a",
            "e4": "a",
            "e5": "a",
            "c7": "C",
            "e7": "c",
            "d0": "D",
            "f0": "d",
            "c8": "E",
            "c9": "E",
            "ca": "E",
            "cb": "E",
            "e8": "e",
            "e9": "e",
            "ea": "e",
            "eb": "e",
            "cc": "I",
            "cd": "I",
            "ce": "I",
            "cf": "I",
            "ec": "i",
            "ed": "i",
            "ee": "i",
            "ef": "i",
            "d1": "N",
            "f1": "n",
            "d2": "O",
            "d3": "O",
            "d4": "O",
            "d5": "O",
            "d6": "O",
            "d8": "O",
            "f2": "o",
            "f3": "o",
            "f4": "o",
            "f5": "o",
            "f6": "o",
            "f8": "o",
            "d9": "U",
            "da": "U",
            "db": "U",
            "dc": "U",
            "f9": "u",
            "fa": "u",
            "fb": "u",
            "fc": "u",
            "dd": "Y",
            "fd": "y",
            "ff": "y",
            "c6": "Ae",
            "e6": "ae",
            "de": "Th",
            "fe": "th",
            "df": "ss"
          }
  var arr = str.split('');
  var result = arr.map(function(x) {
        if(convert[x.charCodeAt().toString(16)]) {
          return convert[x.charCodeAt().toString(16)];
        }
        else {
          return x;
        }
      })
  return result.join("");
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.endsWith = (str, char, position = str.length) => char.length < position && new RegExp("^" + '.'.repeat(position - char.length) + char).test(str);
// function endsWith(str, char, position) {
//   if (!position) {
//     position = str.length;
//   }
//   return str[position - 1] == char ? true : false;
// }





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

suwei.escape =

function escape(str){
  var re = /[&<>"']/g;
  var symbol = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  };
  return str.replace(re, function(x) {return symbol[x]});
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.escapeRegExp =

/*
"^": "//^",
"$": "//$",
".": "//.",
"*": "//*",
"+": "//+",
"?": "//?",
"(": "//(",
")": "//)",
"[": "//[",
"]": "//]",
"{": "//{",
"}": "//}",
"|": "//|",
*/

function escapeRegExp(str){
  var re = /[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g;
  // var symbol = {
  //   "^": "\\^",
  //   "$": "\\$",
  //   ".": "\\.",
  //   "*": "\\*",
  //   "+": "\\+",
  //   "?": "\\?",
  //   "(": "\\(",
  //   ")": "\\)",
  //   "[": "\\[",
  //   "]": "\\]",
  //   "{": "\\{",
  //   "}": "\\}",
  //   "|": "\\|",
  // };
  return str.replace(re, function(x) {return "\\" + x});
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.kebabCase =

function kebabCase(str) {
  return lowerCase(str).replace(/ /g, "-")
}

function lowerCase(str) {
  var words_arr = getWords(str);
  words_str = words_arr.join(" ");
  re = /[a-z][A-Z]/g;
  return words_str.replace(re, m => (m.slice(0,1) + " " + m.slice(1))).toLowerCase();
  
} 

function getWords(str) {  //获得字符串的数组
  input_str = str;
  re = /[A-Za-z0-9]+/g;
  return words = input_str.match(re, input_str);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.lowerCase = 
// function lowerCase(str) {
//   var words_arr = getWords(str);
//   re = /[A-Z]/g;
//   output = words_arr.join(" ").replace(re,m=> " " + m).replace(/  /g, " ").toLowerCase().trim();
//   return output;

// }
function lowerCase(str) {
  var words_arr = getWords(str);
  words_str = words_arr.join(" ");
  re = /[a-z][A-Z]/g;
  return words_str.replace(re, m => (m.slice(0,1) + " " + m.slice(1))).toLowerCase();
  
} 

function getWords(str) {  //获得字符串的数组
  input_str = str;
  re = /[A-Za-z0-9]+/g;
  return words = input_str.match(re, input_str);
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.lowerFirst =
function lowerFirst(str) {
  var str_upper = str;
  return str_upper[0].toLowerCase() + str_upper.slice(1);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.pad =

function pad(input_str, input_num, input_symbol) {
  //if(!input_symbol) {input_symbol = " ";}
  if(arguments[2] == undefined) {input_symbol = " ";}
  var symbol_length = input_num - input_str.length;
  var all_symbol = generatorSymbol(symbol_length, input_symbol);
  var symbol_left_length = Math.floor((input_num - input_str.length) / 2);
  //var symbol_right_length = Math.ceil((input_num - input_str.length) / 2); 
  var symbol_left = all_symbol.slice(0, symbol_left_length);
  var symbol_right = all_symbol.slice(symbol_left_length);
  return symbol_left + input_str + symbol_right;
}

function generatorSymbol(length, symbol) {
  var str = '';
  while(str.length < length) {
    str = symbol + str;
  }
  return str.slice(0, length)
}

//左边符号长度为 Math.floor((input_num - input_str.length) / 2)
//右边符号长度为 Math.ceil((input_num - input_str.length) / 2) 




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.padEnd =
//左边符号长度为 Math.floor((input_num - input_str.length) / 2)
//右边符号长度为 Math.ceil((input_num - input_str.length) / 2) 

function padEnd(input_str, input_num, input_symbol) {
  //if(!input_symbol) {input_symbol = " ";}
  if(arguments[2] == undefined) {input_symbol = " ";}
  var symbol_length = input_num - input_str.length;
  var all_symbol = generatorSymbol(symbol_length, input_symbol);
  return input_str + all_symbol;
}

function generatorSymbol(length, symbol) {
  var str = '';
  while(str.length < length) {
    str = symbol + str;
  }
  return str.slice(0, length)
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.padStart =

//左边符号长度为 Math.floor((input_num - input_str.length) / 2)
//右边符号长度为 Math.ceil((input_num - input_str.length) / 2) 

function padStart(input_str, input_num, input_symbol) {
  //if(!input_symbol) {input_symbol = " ";}
  if(arguments[2] == undefined) {input_symbol = " ";}
  var symbol_length = input_num - input_str.length;
  var all_symbol = generatorSymbol(symbol_length, input_symbol);
  return  all_symbol + input_str;
}

function generatorSymbol(length, symbol) {
  var str = '';
  while(str.length < length) {
    str = symbol + str;
  }
  return str.slice(0, length)
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.parseInt =

function parseInt(str) {
  return +(+str).toString();
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.repeat = (str, times) => Array(times).fill(0).reduce((x, y) => x + str, "")

// function repeat(str, times) {
//   var result = "";
//   var str2 = str;
//   for(i = 0; i < times; i++) {
//     result = result + str;
//   }
//   return result;
// }
// function repeat(str, times)  {
//   return Array(times).fill(0).reduce((x, y) => x + str, "")
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.replace =

function replace(str, pattern, replacement) {
  re = pattern;
  return str.replace(re, replacement);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.snakeCase = 

function kebabCase(str) {
  return lowerCase(str).replace(/ /g, "_")
}

function lowerCase(str) {
  var words_arr = getWords(str);
  words_str = words_arr.join(" ");
  re = /[a-z][A-Z]/g;
  return words_str.replace(re, m => (m.slice(0,1) + " " + m.slice(1))).toLowerCase();
  
} 

function getWords(str) {  //获得字符串的数组
  input_str = str;
  re = /[A-Za-z0-9]+/g;
  return words = input_str.match(re, input_str);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.split =

function split(str, symbol, length) {
  return str.split(symbol).slice(0, length);
  
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.startCase =
function StartCase(str) {
  return str.replace(/([a-z])(?=[A-Z])/g, "$1 ").replace(/[_ -]+/g, " ").replace(/\b\w/g, a =>a.toUpperCase()).trim();
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.startsWith =

function startsWith(str, target, position) {
  return str.indexOf(target, position) == (position == undefined ? 0 : position) ? true: false;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.template 









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toLower =

function toLower(str){
  return str.toLowerCase();
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toUpper =

function toUpper(str){
  return str.toUpperCase();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.trim =

function trim(str, symbol = /\s/) {
  return str.replace(new RegExp(`^[${symbol}]*|[${symbol}]*$`, "g"), "");
}


// function remove_left_right_symbol(str) {
//   return str.match(/([^0-9A-Za-z]*)([0-9A-Za-z].*[0-9A-Za-z])([^0-9A-Za-z]*)/); //返回[全部匹配, 捕获左边, 捕获中间，捕获右边,]
// }

// function remove_common_symbol(input_str, goal_symbol) {
//   for(i = 0; i < goal_symbol.length; i++) {
//     // while(input_str.indexOf(goal_symbol[i]) >= 0) {
//     //   //input_str = input_str.slice(0, input_str.indexOf(goal_symbol[i])) + input_str.slice(input_str.indexOf(goal_symbol[i]));
//     //   input.str.s
//     // }
//     if (input_str.indexOf(goal_symbol[i]) >= 0) {
//     var regexp = new RegExp(goal_symbol[i], "g");
//     input_str = input_str.replace(regexp, "");
//     }
//   }
//   return input_str;
// }



// function trim(str, char) {
  
// }

 /**
   * 去除字符串前后给定的符号
   * @str {字符串} {str} [输入的字符串]
   * @symbol {字符串} [symbol] [要删除的符号]
  //  *[description]
   */
/*
function trim(str, symbol) {
  var input_symbol = symbol + symbol + symbol+ symbol;  
  var input_str_arr = str.split("");
  for(var i = 0; i < input_symbol.length; i++) {
    while(input_str_arr[0] == input_symbol[i]) {
      input_str_arr.shift();
    }
    while(input_str_arr[input_str_arr.length - 1] == input_symbol[i]) {
      input_str_arr.pop();
    }
  }
  console.log(input_str_arr)
}
*/

// function trim(str, symbol) {
//   symbol = symbol ? symbol : "  　";
//   var input_symbol = symbol;
//   var input_str_arr = str.split("");
//   while(input_symbol.indexOf(input_str_arr[0]) != -1){
//     input_str_arr.shift();
//   }
//   while(input_symbol.indexOf(input_str_arr[input_str_arr.length - 1]) != -1){
//     input_str_arr.pop();
//   }
//   return input_str_arr.join("");  
// }





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.trimEnd =

// function trimEnd(str, symbol) {
//   symbol = symbol ? symbol : "  　";
//   var input_symbol = symbol;
//   var input_str_arr = str.split("");
  
//   while(input_symbol.indexOf(input_str_arr[input_str_arr.length - 1]) != -1){
//     input_str_arr.pop();
//   }
//   return input_str_arr.join("");  
// }

function trimEnd(str, symbol = /\s/) {
  return str.replace(new RegExp(`[${symbol}]*$`, "g"), "");
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.trimStart =

// function trimStart(str, symbol) {
//   symbol = symbol ? symbol : "  　";
//   var input_symbol = symbol;
//   var input_str_arr = str.split("");
//   while(input_symbol.indexOf(input_str_arr[0]) != -1){
//     input_str_arr.shift();
//   }
//   return input_str_arr.join("");  
// }

function trimStart(str, symbol = /\s/) {
  return str.replace(new RegExp(`^[${symbol}]*`, "g"), "");
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.truncate =

// funsction truncate(str, condition_object = {}) {
//   var [length, omission, separator] = [condition_object.length || 30, condition_object.omission || "...", condition_object.separator || /(?:)/];
//   var flage = false;
//   var separator_kuo = new RegExp("(" + new RegExp(separator).toString().slice(1, -1) + ")");
//   sep_str = str.split(separator_kuo).reduce((a, b, i) => {
//     if((a + b).length < length) {
//       return a + b;
//     } else {
//       return a;
//     }
//   },"");
//   return str.length > length ? sep_str.substr(0, length - omission.length) + omission : sep_str;   
// }



// function truncate(str, condition_object = {}) {
//   var [length, omission, separator] = [condition_object.length || 30, condition_object.omission || "...", condition_object.separator || /(?:)/];
//   if(str.length > length) {}
// }

function truncate(str, condition_object = {}) {
  var [length, omission] = [condition_object.length || 30, condition_object.omission || "..."];
  if(condition_object.separator == undefined  && str.length > length) {
    return str.substr(0, length - omission.length) +　omission;
  } else if(str.length > length) { // 截到length - condition.smission 的位置
    var new_str = str.substr(0, length - omission.length);
    return new_str.substr(0, new_str.lastIndexOf(...new_str.match(new RegExp(condition_object.separator, "g")).slice(-1))) + omission;
  }
  return str;
}
/////////////////////// 对的版
// function truncate(str, condition_object = {}) {
//   var [length, omission] = [condition_object.length || 30, condition_object.omission || "..."];
//   if(condition_object.separator == undefined  && str.length > length) {
//     return str.substr(0, length - omission.length) +　omission;
//   } else if(str.length > length) { // 截到length - condition.smission 的位置
//     var separator = new RegExp(condition_object.separator, "g"); // 
//     var new_str = str.substr(0, length - omission.length);
//     return new_str.substr(0, new_str.lastIndexOf(...new_str.match(separator).slice(-1))) + omission;
//   }
//   return str;
// }
/////////////////////// 对的版

// function truncate(str, condition_object = {length: 30, omission: "...", separator: /./}) {
//   var first_str = str.substr(0, length - condition_object.omission.length);
//   var re = new RegExp(condition_object.separator, "g");
//   var match_arr = first_str.match(re);
//   result = match_arr ? first_str.slice(0, first_str.lastIndexOf(match_arr[match_arr.length - 1]) + 1) : first_str;
//   return 
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.unescape =

function unescape(str) {
  var entities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&apos;": "'",
  }
  var input_str = str;
  var re = /&amp;|&lt;|&gt;|&quot;|&apos;/g
  return input_str.replace(re, x => entities[x]);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.upperCase =
function upperCase(str) {
  var words_arr = getWords(str);
  re = /[A-Z]/g;
  output = words_arr.join(" ").replace(re,m=> " " + m).toUpperCase();
  return output;
}

function getWords(str) {  //获得字符串的数组
  input_str = str;
  re = /[A-Za-z0-9]+/g;
  return words = input_str.match(re, input_str);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.upperFirst = str => str.replace(/^(\w)/, m => m.toUpperCase())

// function upperFirst(str) {   //把第一个字母大写
//   var input_str = str;
//   return input_str.slice(0, 1).toUpperCase() + input_str.slice(1);
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.words = (str, pattern = /\w+/g) => str.match(pattern);

// function words(str, pattern = /\w+/g) {
//   return str.match(pattern);
// }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Util/////////////////////////////////////////////////


suwei.attempt


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.bindAll =
// this.toPath(methodNames);
function (object, methodNames) {
  methodNames = Array.isArray(methodNames) ? methodNames : [methodNames];
  methodNames.forEach((x) => object[x] = object[x].bind(object));
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.cond


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.conforms =

function conforms(source) {
  return function(arg) {
    return Object.keys(source).every((value) => source[value](arg[value]));
  }
} 




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.constant = value => () => value;

// function constant(value) {
//   return function() {
//     return value;
//   }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.defaultTo =

function defaultTo(value, defaultValue) {
  return this.isNaN(value) || value === null || value === undefined ? defaultValue : value;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flow = func => (...args) => func.reduce((x, y, i) => i === 0 ? y(...x) : y(x), args);
// function flow(func) {
//   var that = this;
//   return function(...args) {
//     return func.reduce((x, y, i) => {if(i === 0) return y(...args); else return y(x)}, args);
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.flowRight = func => (...args) => func.reduceRight((x, y, i) => i === 0 ? y(...x) : y(x), args); 


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.identity


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.iteratee


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.method = (path, args) => obj => args ? suwei.toPath(path).reduce((x, y)  => x[y], obj)(...args) : suwei.toPath(path).reduce((x, y) => x[y], obj)();

// function method(path, args) {
  
//   return function (obj) {
//     return args ? this.toPath(path).reduce((x, y) => x[y], obj)() : this.toPath(path).reduce((x, y) => x[y], obj)(...args);
//   }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.methodOf = (object, args) => path => args ? suwei.toPath(path).reduce((x, y) => x[y], object)(...args) : suwei.toPath(path).reduce((x, y) => x[y], object)();

// function methodOf(object, args) {
//   var self = this;
//   return function (path) {
//     return args ? self.toPath(path).reduce((x, y) => x[y], object)(...args) : self.toPath(path).reduce((x, y) => x[y], object)();
//   }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.mixin =

function mixin(object = suwei, source, option = {}) {   /*object.__proto__.x = source([x])   object = source([x])*/
  var that = this;
  arguments.length === 1 && (source = object, object = suwei);
  Object.keys(source).forEach((x) => that.isFunction(source[x]) && (that.isFunction(object) ? object.__proto__.x = source[x] : object = source[x]));
  return object;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.noConflict


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.noop


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.nthArg = (n = 0) => (...arg) => arg[(n + arg.length) % arg.length];

// function nthArg(n = 0) {
//   return function(...arg) {
//     return arg[(n + length) % length ]
//   }
// }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.over


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.overEvery


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.overSome


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.property = path => (obj) => suwei.toPath(path).reduce((x, y) => x[y], obj);


// function(path) {
//   path = this.toPath(path);
//   return function(obj) {
//     return path.reduce((x, y) => x[y], obj);
//   //   var result = obj;
//   //   for(var i = 0; i < arr.length; i++) {
//   //     result = result[arr[i]];
//   //   }
//   //   return result;
//   // }
//   }
// }


///////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.propertyOf =

function(object) {                
  var self = this;
  return function(arg) {
    return self.toPath(arg).reduce((x, y) => x[y], object);
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.range =

function range(start = 0, end, step = 1) {
  var result = [];
  if(arguments.length === 1 && arguments[0] <= 0) {
    end = start, start = 0, step = -1;
  }
  else if(arguments.length === 1) {
    end = start, start = 0;
  }
  for(var i = start; Math.abs(i) < Math.abs(end) && result.length < Math.abs(end - start); i += step) {
    result.push(i);
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.rangeRight =

// function rangeRight(start = 0, end, step = 1) {
//   var result = [];
//   if(arguments.length === 1 && arguments[0] <= 0) {
//     end = start, start = 0, step = -1;
//   } else if(arguments.length === 1) {
//     end = start, start = 0;
//   }
  




//   for(var i = (Math.abs(end) - 1); i >= start; i -= step)
//     result.push(i);
//   }
//   return result;
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.runInContext


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.stubArray


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.stubFalse


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.stubObject


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.stubString


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.stubTrue


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.times =

function times(n, iteratee) {
  var result = [];
  for(var i = 0; i < n; i++){
    result.push(iteratee(i));
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.toPath =

function toPath(value) {
  try{
    return value.match(/[^\[\]\.]/g);
  } catch (e) {
    return value;
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.uniqueId =

function uniqueId(prefix = "") {
  amount ? amount++ : amount = 1;
  return prefix + amount;
}



/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

suwei.VERSION


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings.escape


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings.evaluate


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings.imports


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings.interpolate


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


suwei.templateSettings.variable


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/