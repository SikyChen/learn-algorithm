/**
 * 当大根堆中，某位置 i 的节点改变了，如何将其恢复成大根堆？
 * 
 * 1. 跟父节点比较大小，如果比父节点大，则一直吕布算法即可；
 * 2. 跟两个子节点比较大小
 *    1）若目标节点大，则不交换，结束
 *    2）若子节点大，则找出两个子节点中更大的子节点，跟目标节点做交换
 *    3）依次往下比较，当子节点的位置 i 超出数组长度时，停止
 * 
 * [ 9, 8, 4, 5, 3, 2 ]
 * i = 2, p = 10
 * 
 * 原大根堆
 *      9
 *   8    4
 * 5  3  2
 * 
 * 改变后
 *      9
 *   8    10
 * 5  3  2
 * 
 * 恢复大根堆
 *      10
 *   8    9
 * 5  3  2
 * 
 * 结果为
 * [ 10, 8, 9, 5, 3, 2 ]
 * 
 * 
 * 若
 * [ 9, 8, 4, 5, 3, 2 ]
 * i = 1, p = 1
 * 
 * 原大根堆
 *      9
 *   8    4
 * 5  3  2
 * 
 * 改变后
 *      9
 *   1    4
 * 5  3  2
 * 
 * 恢复大根堆
 *      9
 *   5    4
 * 1  3  2
 * 
 * 结果为
 * [ 9, 5, 4, 1, 3, 2 ]
 */


const { getFatherIndex, getLeftSonIndex, getRightSonIndex, swap } = require('./01.heap');

/**
 * heapify
 * @param {Array} arr 原大根堆数组
 * @param {Number} i 改变的节点的下标
 * @param {Number} p 改变后节点的数字 
 */
function recoverBigRootHeap(arr, i, p) {
  arr = arr.concat();
  arr[i] = p;

  let tempIndex = i;

  // 检测比父节点大，往上交换
  let fatherIndex = getFatherIndex(tempIndex);
  while (tempIndex > 0 && arr[tempIndex] > arr[fatherIndex]) {
    swap(arr, tempIndex, fatherIndex);
    tempIndex = fatherIndex;
    fatherIndex = getFatherIndex(tempIndex);
  }

  // 比父节点小，则跟左右子节点比较，往下交换
  let leftSonIndex = getLeftSonIndex(tempIndex);
  let rightSonIndex = getRightSonIndex(tempIndex);
  while (
    (leftSonIndex < arr.length && arr[tempIndex] < arr[leftSonIndex]) ||
    (rightSonIndex < arr.length && arr[tempIndex] < arr[rightSonIndex])
  ) {
    if (rightSonIndex < arr.length && arr[leftSonIndex] < arr[rightSonIndex]) {
      // 右侧子节点存在，且大，跟右侧子节点交换
      swap(arr, tempIndex, rightSonIndex);
      // 交换后会有新的左右子节点位置
      tempIndex = rightSonIndex;
    }
    else {
      // 否则，跟左侧子节点交换
      swap(arr, tempIndex, leftSonIndex);
      // 交换后会有新的左右子节点位置
      tempIndex = leftSonIndex;
    }
    leftSonIndex = getLeftSonIndex(tempIndex);
    rightSonIndex = getRightSonIndex(tempIndex);
  }

  return arr;
}

// 测试代码
const arr = [ 9, 8, 4, 5, 3, 2 ];
console.log(recoverBigRootHeap(arr, 2, 10));
console.log(recoverBigRootHeap(arr, 1, 1));

