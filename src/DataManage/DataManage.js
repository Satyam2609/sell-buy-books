function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
  
  function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
      }
    }
    return arr;
  }
  function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    return arr;
  }
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
  }
  function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  function quickSort(arr) {
    if (arr.length <= 1) return arr;
  
    const pivot = arr[arr.length - 1];
    const left = [], right = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) left.push(arr[i]);
      else right.push(arr[i]);
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      
      if (arr[mid] === target) return mid;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    
    return -1; // Not found
  }  
  