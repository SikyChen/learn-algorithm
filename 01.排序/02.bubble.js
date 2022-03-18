/**
 * 冒泡排序
 * 遍历比较相邻两个数，将大数换位到右边，则最右边的数是最大数
 * 返回改变后的原数组
 * 
 * O(n^2)
 */

function bubble(array) {
  if (!array instanceof Array) {
    throw new Error(`Type Error: ${array} is not Array`);
  }
  if (array.length < 2) {
    return array;
  }

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (isNaN(array[j])) {
        throw new Error(`第${j + 1}个元素不是一个数字`);
      }

      // 交换位置，将大数放到右面
      if (array[j] - array[j + 1] > 0) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}


// 测试代码

const { sorterTest } = require("../00.TEST");
sorterTest(bubble);
