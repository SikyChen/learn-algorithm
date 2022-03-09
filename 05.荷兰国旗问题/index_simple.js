/**
 * 荷兰国旗问题，简单版
 * 给定一个数组，和一个数 p ，将小于等于 p 的数放在左边，大于 p 的数，放在右边
 */

function partition(nums, p) {
  let left = 0;
  let right = nums.length - 1;
  let i = 0;

  while(i <= right) {
    if (nums[i] <= p) {
      swap(nums, i, left);
      left++;
      i++;
    }
    else if (nums[i] > p) {
      swap(nums, i, right);
      right--;
    }
    // 这里的 else 原本是用于处理 nums[i] === p 的情况，由于简单版只关注小于等于，所以不需要做单独处理了
    // else {
    //   i++;
    // }
  }

  return nums;
}

function swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// 测试代码
const arr = [2, 4, 4, 7, 1, 6, 4, 2];
// const arr = [2, 3, 1, 0, 4, 4, 4, 7];
console.log(partition(arr.concat(), 4));


// 单向奔赴的partition
function partition2(nums, p) {
  let left = 0;
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] <= p) {
      swap(nums, index, left);
      left++;
    }
  }

  return nums;
}

// 测试代码
const arr2 = [2, 4, 4, 7, 1, 6, 4, 2];
partition2(arr2, 4);
console.log('arr2', arr2);