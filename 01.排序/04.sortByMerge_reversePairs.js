/**
 * 逆序对问题
 * 归并排序算法的延伸
 * 如果数组中任意两个数，左侧比右侧大，则成为有一个逆序对。找出逆序对的总数。
 * @returns {Number} 逆序对的总数
 */

/**
 * 暴力解法
 */
function reversePairs(nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) sum++;
    }
  }
  return sum;
}

// 测试代码
const arr = [7, 5, 6, 4];
console.log(reversePairs(arr.concat()));


/**
 * 归并排序解法
 */
function reversePairs2(nums) {
  let temp = [];
  let res = 0;

  divid(0, nums.length - 1);

  return res;

  function divid(start, end) {
    if (start < end) {
      const mid = getMid(start, end);

      divid(start, mid);
      divid(mid + 1, end);

      merge(start, mid, end);
    }
  }

  function merge(start, mid, end) {
    let l = start;
    let r = mid + 1;
    temp = [];

    while (l <= mid && r <= end) {
      if (nums[l] <= nums[r]) {
        temp.push(nums[l]);
        l++;
      }
      else {
        // 逆序对问题的关键点
        res += mid + 1 - l;
        temp.push(nums[r]);
        r++;
      }
    }

    while (l <= mid) {
      temp.push(nums[l]);
      l++;
    }

    while (r <= end) {
      temp.push(nums[r]);
      r++;
    }

    for (let i = 0; i < temp.length; i++) {
      nums[start + i] = temp[i];
    }
  }
};

// 获取中间值
function getMid(l, r) {
  return Math.floor(l + ((r - l) / 2));
}

// 测试代码
console.log(reversePairs2(arr.concat()));