/**
 * 二分法：有序数组中查找一个数
 * 如果找到则返回 index
 * 如果没找到则返回 -1
 * 
 * @param {Array} array 目标数组
 * @param {Number} target 要查找的数字
 */
function findNum(array, target) {
  if (!array instanceof Array) {
    throw new Error('不是一个数组');
  }
  if (isNaN(target)) {
    throw new Error('不是一个数字');
  }

  let l = 0;
  let r = array.length - 1;
  let mid = getMid(l, r);

  while(l < r - 1) {
    if (array[mid] > target) {
      r = mid;
      mid = getMid(l, r);
    }
    else if (array[mid] < target) {
      l = mid;
      mid = getMid(l, r);
    }
    else {
      return mid;
    }
  }

  if (array[l] === target) {
    return l;
  }

  if (array[r] === target) {
    return r;
  }

  return -1;
}

function getMid(l, r) {
  return Math.floor(l + ((r - l) / 2));
}

// 测试代码
const arr = [0, 1, 2, 3, 4, 6, 7, 8, 9];
console.log(findNum(arr, 0));