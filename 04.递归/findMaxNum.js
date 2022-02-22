/**
 * 找出数组最大值并返回
 */

/**
 * 遍历法 O(N)
 */
function findMaxNum(array) {
  let max = -Infinity;
  let maxIndex = -1;

  for(let i=0; i<array.length; i++) {
    if (array[i] > max) {
      max = array[i];
      maxIndex = i;
    }
  }

  return max;
}

/**
 * 递归法 O(logN)
 */
function findMaxNum2(array) {
  function find(l, r) {
    if (l === r) {
      return array[l];
    }

    let mid = Math.floor(l + ((r - l) / 2));

    return Math.max(find(l, mid), find(mid + 1, r));
  }

  return find(0, array.length - 1);
}

// 测试代码
const arr = [200,3,4,9,0,8,6,7,23,3,89,10];
console.log(findMaxNum(arr));
console.log(findMaxNum2(arr));