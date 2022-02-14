/**
 * 选择排序
 * 从第一个数开始，遍历第一次，找到最小数跟第一个数交换位置
 * 从第二个数开始，遍历第二次，找到最小数跟第二个数交换位置
 * ...
 * 直到最后
 * 
 * O(n^2)
 */

function selectSorter(array) {
  if (!array instanceof Array) {
    throw new Error(`Type Error: ${array} is not Array`);
  }
  if (array.length < 2) {
    return array;
  }

  for(let i=0; i<array.length; i++) {
    let minIndex = i;
    for (let j=i; j<array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // 交换位置
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }

  return array;
}

// 测试代码
const { sorterTest } = require('test');
sorterTest(selectSorter);