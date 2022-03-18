/**
 * 插入排序法
 * 类似打扑克牌，抓牌的时候，从右向左找对应的位置插入
 * 1. 按位跟左面的比较
 * 2. 跟左侧一位比较，比左边大，则停
 * 3. 比左侧小，则交换，交换后再跟左侧比较
 * [6, 7, 5, 4, 3, 8, 1]
 * ‘’‘’^
 *    1位，比左侧大，则停
 * [6, 7, 5, 4, 3, 8, 1]
 * ‘’‘’‘’‘^
 *       2位，5比左侧7小，交换
 * [6, 5, 7, 4, 3, 8, 1]
 *     ^
 *       2位，5比左侧6小，交换
 * [5, 6, 7, 4, 3, 8, 1]
 *  ^
 *       2位，现在2位前面已经排好序了
 * [5, 6, 7, 4, 3, 8, 1]
 * ‘’‘’‘’‘’‘’^
 *           3位，4比7小，交换后又比6小，交换后又比5小，所以
 * [4, 5, 6, 7, 3, 8, 1]
 *  ^
 *           3位，现在3位前已经排好序了
 * ...
 */

function sortByInsertion(array) {
  if (!array instanceof Array) {
    throw new Error('入参不是数组');
  }
  if (array.length <= 1) {
    return array;
  }

  for (let i = 1; i < array.length; i++) {
    // 取出数组 0 ~ i 位，使用 i 位的数依次跟前面的数作比较，若比某一个数大，则停，否则交换位置
    for (let j = i - 1; j >= 0; j --) {
      if (array[j+1] >= array[j]) {
        break;
      }
      else {
        swap(array, j+1, j);
      }
    }
  }

  return array;
}

function swap(array, i, j) {
  array[i] = array[i] ^ array[j];
  array[j] = array[i] ^ array[j];
  array[i] = array[i] ^ array[j];
}


// 测试代码
const { sorterTest } = require("../00.TEST");
sorterTest(sortByInsertion);

// const arr = [6, 7, 5, 4, 3, 8, 1];
// console.log(arr);
// console.log(sortByInsertion(arr));