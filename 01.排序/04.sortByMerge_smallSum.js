/**
 * 小和问题
 * 归并排序算法的延伸
 * @returns {Number} 所有比当前数 小 的左边的数 之和
 */

/** 
 * 暴力解法
 */
function smallSum(array) {
  if (array.length < 1) {
    return array[0];
  }

  let sum = 0;
  for(let i=1; i<array.length; i++) {
    for(let j=0; j<i; j++) {
      if (array[j] < array[i]) {
        sum += array[j];
      }
    }
  }

  return sum;
}

// 测试代码
const arr = [1,3,4,2,5];
const arr2 = [4, 76, 5, 8, 9, 32, 7, 5, 89, 0, 4, 3, 5, 4, 78, 93, 2, 6, 0, 7];
console.log(smallSum(arr));
console.log(smallSum(arr2));


/**
 * 归并排序延伸解法
 * 1. 正常进行归并排序
 * 2. 在给 相邻的有序子序列 进行对比和排序的时候，将 左数组 较小的数，加起来即可
 * 3. 依托于 归并排序 过程中，每个数都跟其左侧的所有数，做过了比较，所以可以取出每个数左侧的小和
 */

