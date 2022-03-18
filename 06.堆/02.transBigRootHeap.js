/**
 * 大根堆
 * 「吕布算法」
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
 * 假如存入大根堆的数，需要一个一个取出，即，只能从前往后遍历数组的话，要怎么做？
 * 
 * [4, 5, 2, 8, 3, 9]
 * 过程：
 * 1. 取出第一个数，存入第一个位置，也就是根节点
 *          4
 * 
 * 2. 取出第二个数 5，跟父节点 4 做比较，若大，则交换，由于 5 > 4 所以交换
 *          4                  5         
 *        5                  4
 * 
 * 3. 取出第三个数 2，跟父节点 5 作比较，若小，则不交换，由于 2 < 5 所以不交换
 *          5                  5
 *        4   2              4   2
 * 
 * 4. 取出第四个数 8，跟父节点 4 作比较，8 > 4 ，所以交换，再跟新的父节点 5 比较，8 > 5，所以交换
 *          5                  5                  8
 *        4   2              8   2              5   2
 *      8                  4                  4
 * 
 * 5. 取出第五个数 3，跟父节点 5 作比较，3 < 5 ，所以不交换，继续
 *          8
 *        5   2
 *      4  3
 * 
 * 6. 取出第六个数 9，跟父节点 2 作比较，9 > 2 ，所以交换，再跟新的父节点 8 比较，9 > 8，所以交换
 *          8                  8                  9
 *        5   2              5   9              5   8
 *      4  3 9             4  3 2             4  3 2
 * 
 * 最终得到的数组为
 * [9, 5, 8, 4, 3, 2]
 * 
 */

const { getFatherIndex, swap } = require('./01.heap');

function transBigRootHeap(arr) {
  const heap = [];
  for (let i = 0; i < arr.length; i++) {
      heap.push(arr[i]);
      let tempIndex = heap.length - 1;
      let fatherIndex = getFatherIndex(tempIndex);
      while(tempIndex > 0 && heap[tempIndex] >= heap[fatherIndex]) {
        swap(heap, tempIndex, fatherIndex);
        tempIndex = fatherIndex;
        fatherIndex = getFatherIndex(tempIndex);
      }
  }
  return heap;
}

// 测试代码
const arr = [4, 5, 2, 8, 3, 9];
console.log(transBigRootHeap(arr));


module.exports = {
  transBigRootHeap
}