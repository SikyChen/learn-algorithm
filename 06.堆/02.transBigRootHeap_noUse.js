/**
 * ！！！！！！！！ 这个算法有问题  ！！！！！！！！！！！！
 * 如果是下面的结构
 *         8
 *      5     10
 *    3  2   4  9
 * 右侧的9比10小，所以不能换到上面去
 * 但10比8大，可以换上去，变成
 *         10
 *      5     8
 *    3  2   4  9
 * 结果右下角不是大根堆了
 * 
 * 所以从后往前遍历，并且从下往上走大数的方法行不通。应该让头结点的数，从上往下走，所以不要参考这个思路啦~
 * 
 * ----------------------------------------------------------------------------------------------------------
 * 
 * 大根堆
 * 
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
 * 算法逻辑(错误的)
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
  let count = 0;
  for(let i=arr.length - 1; i>=0;) {
    let tempIndex = i;
    let fatherIndex = getFatherIndex(tempIndex);
    while(tempIndex > 0 && arr[tempIndex] >= arr[fatherIndex]) {
      swap(arr, tempIndex, fatherIndex);
      tempIndex = fatherIndex;
      fatherIndex = getFatherIndex(tempIndex);
    }
    if (i <= 0 || arr[i] <= arr[getFatherIndex(i)]) {
      i--;
    }
    // count++
    // if (count > 40) break;
  }
}

// 测试代码
// const arr = [4, 5, 2, 8, 3, 9];
// const arr = [3, 5, 3, 0, 8, 6, 1, 5, 8, 6, 2, 4, 9, 4, 7, 0, 1, 8, 9, 7, 3, 1, 2, 5, 9, 7, 4, 0, 2, 6];
// const arr = [46434,25076,49641,13875,20389,19216,46758,16479,34115,37460];
const arr = [8,5,10,1,4,3,9,2,6,7];
transBigRootHeap(arr);
console.log(arr);

module.exports = {
  transBigRootHeap
}