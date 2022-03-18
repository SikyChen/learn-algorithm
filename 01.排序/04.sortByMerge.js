/**
 * 归并排序
 * 分治法，递归实现
 * 
 * 先分：将数组从中间分为两个相邻子序列，递归实现
 * 再治：将相邻的有序子序列排序，使用 temp 数组，依次取出两个数组中的最小位置的值存入 temp，则可得到一个新的有序 temp 数组
 */

/**
 * 准备空数组 temp
 * []
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *  |              |
 * 
 * ----
 * 左侧 1 小，取 1
 * [1]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *     |           |
 * 
 * ----
 * 右侧 2 小，取 2
 * [1, 2]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *     |              |
 * 
 * ----
 * 右侧 3 小，取 3
 * [1, 2, 3]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *     |                 |
 * 
 * ----
 * 右侧 6 小，取 6
 * [1, 2, 3, 6]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *     |                    |
 * 
 * ----
 * 左侧 7 小，取 7
 * [1, 2, 3, 6, 7]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *        |                 |
 * 
 * ----
 * 右侧 8 小，取 8
 * [1, 2, 3, 6, 7, 8]
 * [1, 7, 9, 10]  [2, 3, 6, 8]
 *        |                    |
 * 
 * ----
 * 右侧超出，将左侧剩下的值依次取出
 * [1, 2, 3, 6, 7, 8, 9, 10]
 * 
 */

function sortByMerge(array) {

  const temp = [];
  sort(array, 0, array.length - 1, temp);
  return array;

}


function sort(array, start, end, temp) {
  if (start < end) {
    const mid = getMid(start, end);
    sort(array, start, mid);
    sort(array, mid + 1, end);
    merge(array, start, mid, end, temp);
  }
}

function merge(array, start, mid, end, temp) {
  let l = start;    // 左侧数组指针
  let r = mid + 1;  // 右侧数组指针
  temp = [];        // 清空临时数组

  while (l <= mid && r <= end) {
    if (array[l] <= array[r]) {
      temp.push(array[l]);
      l++;
    }
    else {
      temp.push(array[r]);
      r++;
    }
  }
  // console.log(JSON.stringify(array))
  // console.log('temp', JSON.stringify(temp))
  while (l <= mid) {
    temp.push(array[l]);
    l++;
  }

  while (r <= end) {
    temp.push(array[r]);
    r++;
  }

  for (let t = 0; t < temp.length; t++) {
    array[start + t] = temp[t];
  }

  return temp;
}

function getMid(l, r) {
  return Math.floor(l + ((r - l) / 2));
}


// 测试代码
const { sorterTest } = require("../00.TEST");
sorterTest(sortByMerge);
// const arr = [4, 76, 5, 8, 9, 32, 7, 5, 89, 0, 4, 3, 5, 4, 78, 93, 2, 6, 0, 7]
// console.log(arr.sort((a, b) => a - b));
// console.log(sortByMerge(arr));
