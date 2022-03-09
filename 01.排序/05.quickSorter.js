/**
 * 快速排序
 * 利用荷兰国旗问题，从数组中随便取出一个数，作为荷兰国旗的p，进行荷兰国旗问题的处理，叫做 分区（partition）
 * partition 一次后，小于p的数在左侧，等于p的数在中间，大于p的数在右侧
 * 而后分别对左右两边的数，进行 partition ，递归的 partition 下去即可
 * 
 * 简单说就是 递归 + partition
 */

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 此处的 partition ，使用所含数组分段中的第一个数，作为基准 p
// 返回结果是两个下标，分别为中间分区的左右两个下标
function partition(arr, left, right) {
  const p = arr[left];
  let l = left;
  let r = right;
  let i = left;

  while(i <= r) {
    if (arr[i] < p) {
      swap(arr, i, l);
      i++;
      l++;
    }
    else if (arr[i] > p) {
      swap(arr, i, r);
      r--;
    }
    else {
      i++;
    }
  }

  return [l, r];
}

// 测试代码
// const arr = [4, 2, 4, 7, 1, 6, 4, 2];
// const arr = [3,2,4,4,4]
// const [left, right] = partition(arr, 0, arr.length - 1);
// console.log(left, right);

function quickSorter(nums) {
  if (!Array.isArray(nums)) {
    return -1;
  }

  function sorter(nums, left, right) {
    if (left < right) {
      const [pL, pR] = partition(nums, left, right);
      sorter(nums, left, pL - 1);
      sorter(nums, pR + 1, right);
    }
  }

  sorter(nums, 0, nums.length -1);

  return nums;
}

// 测试代码
const { sorterTest } = require('test');
sorterTest(quickSorter);

// const arr = [4, 76, 5, 8, 9, 32, 7, 5, 89, 0, 4, 3, 5, 4, 78, 93, 2, 6, 0, 7]
// // console.log(arr.sort((a, b) => a - b));
// quickSorter(arr)
// console.log(arr);