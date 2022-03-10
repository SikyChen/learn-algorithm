/**
 * 大根堆
 * 所有的节点，都比它的子节点大的堆，就是大根堆
 * 很明显，根节点是在大根堆中，最大的节点
 * 
 *         8
 *      5     6
 *    3  2   4  1
 * 
 * 如上就是一个大根堆，数组既是
 * [8, 5, 6, 3, 2, 4, 1]
 * 
 * 如果有一个普通的堆，如何转为大根堆？
 * 
 *         4
 *      5     2
 *    8  3   9
 * 
 * 数组为 [4, 5, 2, 8, 3, 9]
 * 其大根堆为
 * 
 *         9
 *      8     4
 *    5  3   2
 * 数组为 [9, 8, 4, 5, 3, 2]
 * 
 * 原则就是，从后往前遍历数组，拿每个节点去跟它的父节点做对比
 * 若比父节点大，则交换，让大的数往上走，然后再向上对比，一直比到根节点；
 * 若比父节点小，则不需要交换了，换下一个数去对比
 * 
 * 关键在于拿一个节点，一直向上比到根节点
 * 
 * 名曰 「吕布算法」 ，找爹，并且干掉爹
 */

const { getFatherIndex, swap } = require('./01.heap');

function transBigRootHeap(arr) {
  for(let i=arr.length - 1; i>=0; i--) {
    let tempIndex = i;
    let fatherIndex = getFatherIndex(tempIndex);
    while(tempIndex > 0 && arr[tempIndex] >= arr[fatherIndex]) {
      swap(arr, tempIndex, fatherIndex);
      tempIndex = fatherIndex;
      fatherIndex = getFatherIndex(tempIndex);
    }
  }
}

// 测试代码
const arr = [4, 5, 2, 8, 3, 9];
transBigRootHeap(arr);
console.log(arr);

