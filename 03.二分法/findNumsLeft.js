/**
 * 查找某个数，在有序数组中第一次出现的位置
 */
function findNumsLeft(array, target) {
  if (!array instanceof Array) {
    throw new Error('不是一个数组');
  }
  if (isNaN(target)) {
    throw new Error('不是一个数字');
  }

  let l = 0;
  let r = array.length - 1;
  let mid = getMid(l, r);

  while (l < r - 1) {
    if (array[mid] >= target) {
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
const arr = [0, 0, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 6, 6, 7, 7, 7, 8, 9, 9, 9, 9, 10];
console.log(findNumsLeft(arr, 11));