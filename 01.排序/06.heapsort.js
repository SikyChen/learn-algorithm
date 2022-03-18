/**
 * 堆排序
 * 利用大根堆的 root 总是最大值的特点进行从大到小的排序
 * 利用小根堆的 root 总是最小值的特点进行从小到大的排序
 * 
 * 原理（例大根堆）
 * 由于 root 最大，将最后一个值跟 root 对换位置，则最后一个位置最大。调整新的堆为大根堆后， root 值是第二大了，将倒数第二个值跟 root 对换位置，则倒数第二个位置是第二大。以此类推。
 * 最终得到的数组，就是从后往前，依次变小的数组了
 * 
 * 步骤
 * 1. 构建大根堆
 * 2. 将最后一个数跟 root 交换，就是 0 位置的数交换
 * 3. 去掉最后一个位置，将前面的数组重新调整为大根堆
 * 4. 重复 2、3 步骤，最终得到一个升序的数组
 */

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function getLeftSonIndex(i) {
  return 2 * i + 1;
}

function getRightSonIndex(i) {
  return 2 * i + 2;
}

function getFatherIndex(i) {
  return Math.floor((i - 1) / 2);
}

// 将传入的数组，变成大根堆数组
function buildBigRootHeap(arr) {
  if (arr.length <= 1) return arr;

  for (let i = 0; i < arr.length; i++) {
    let tempIndex = i;
    let fatherIndex = getFatherIndex(i);
    while(tempIndex > 0 && arr[tempIndex] > arr[fatherIndex]) {
      swap(arr, tempIndex, fatherIndex);
      tempIndex = fatherIndex;
      fatherIndex = getFatherIndex(tempIndex);
    }
  }
}

// 将 0 位置变化后的数组，重新变回大根堆
function heapify(arr, last) {
  let tempIndex=0;
  let leftSonIndex = 1;
  let rightSonIndex = 2;

  while(
    leftSonIndex <= last && arr[tempIndex] < arr[leftSonIndex] ||
    rightSonIndex <= last && arr[tempIndex] < arr[rightSonIndex]
  ) {
    if (rightSonIndex <= last && arr[leftSonIndex] < arr[rightSonIndex]) {
      swap(arr, tempIndex, rightSonIndex);
      tempIndex = rightSonIndex;
    }
    else {
      swap(arr, tempIndex, leftSonIndex);
      tempIndex = leftSonIndex;
    }
    leftSonIndex = getLeftSonIndex(tempIndex);
    rightSonIndex = getRightSonIndex(tempIndex);
  }
}

// 堆排序
function heapsort(arr) {
  // 数组中需要进行 heapify 的部分的最后一个值的下标
  let last = arr.length - 1;

  // 构建大根堆
  buildBigRootHeap(arr);

  // 重复 2、3 步骤
  while(last >= 0) {
    swap(arr, 0, last);
    last--;
    heapify(arr, last);
  }
  return arr;
}

// 测试代码
// let arr = [1,4,2,3];
// let arr = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6];
const arr = [4, 76, 5, 8, 9, 32, 7, 5, 89, 0, 4, 3, 5, 4, 78, 93, 2, 6, 0, 7]
console.log(heapsort(arr));
// console.log(arr)

// 测试代码
const { sorterTest } = require("../00.TEST");
sorterTest(heapsort);