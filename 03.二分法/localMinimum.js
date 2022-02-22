
/**
 * 局部最小值问题
 * 在一个数组中 array 中，至少有一个局部最小值，找出其中一个
 * 1. 若 array[0] < array[1] 或 array[length - 1] < array[length -2] ，则两边是一个局部最小值
 * 2. 若 array[i] < array[i - 1] && array[i] < array[i + 1] ，则 i 是局部最小值
 * 
 * @param {*} array 
 * @returns 局部最小值的下标
 */


/**
 * 遍历法，时间复杂度 O(N)
 */
function findMinElement(array) {
  const length = array.length;

  // 两边的值有局部最小值的情况
  if (length === 1 || array[0] < array[1]) {
    return 0;
  }

  if (array[length - 1] < array[length - 2]) {
    return length - 1;
  }

  // 两边的值都不是局部最小值的情况
  for (let i = 1; i <= length - 2; i++) {
    if (array[i] < array[i - 1] && array[i] < array[i + 1]) {
      return i;
    }
  }

  return -1;

}

/**
 * 二分法，时间复杂度 O(logN)
 * 
 * 思路：
 * 1. 若两边不是局部最小值，则局部最小值一定在中间某个位置，若 l 位置是下坡，r 位置是上坡，那么中间一定有至少一个坡底
 * 2. mid 位置若是上坡，则 l 到 mid 之间，一定有个 坡底，故将 mid 作为 r 继续找
 * 3. mid 位置若是下坡，则 mid 到 r 之间，一定有个 坡底，故将 mid 作为 l 继续找
 */
function findMinElement2(array) {
  const length = array.length;

  // 两边的值有局部最小值的情况
  if (length === 1 || array[0] < array[1]) {
    return 0;
  }

  if (array[length - 1] < array[length - 2]) {
    return length - 1;
  }

  // 设置左右两个指针
  let l = 0;
  let r = length - 1;
  while( l < r) {
    let mid = getMid(l, r);
    if (array[mid - 1] > array[mid] && array[mid] < array[mid + 1]) {
      return mid;
    }
    else if (array[mid - 1] < array[mid] && array[mid] < array[mid + 1]) {
      r = mid;
    }
    else if (array[mid - 1] > array[mid] && array[mid] > array[mid + 1]) {
      l = mid;
    }
    else {
      r = mid;
    }
  }

  return -1;

}

function getMid(l, r) {
  return Math.floor(l + ((r - l) / 2));
}


// 测试代码
const test_array = [1, -4,-3,-2,-1,4,3,1,2];
console.log('a', findMinElement(test_array));
console.log('b', findMinElement2(test_array));