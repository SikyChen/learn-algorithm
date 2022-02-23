/**
 * 小和问题
 * 归并排序算法的延伸
 * @returns {Number} 所有比当前数 小 的左边的数 之和
 */

/** 
 * 暴力解法
 */
function smallSum(array) {
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
console.log(smallSum(arr.concat()));
console.log(smallSum(arr2.concat()));


/**
 * 归并排序延伸解法
 * 1. 正常进行归并排序
 * 2. 在给 相邻的有序子序列 进行对比和排序的时候，将 左数组 较小的数，加起来即可
 * 3. 依托于 归并排序 过程中，每个数都跟其左侧的所有数，做过了比较，所以可以取出每个数左侧的小和
 */
function smallSumByMerge(array) {
  if (array.length < 1) return 0;

  let sum = 0;
  let temp = [];

  divid(0, array.length - 1);

  return sum;

  function divid(start, end) {
    if (start < end) {
      let mid = getMid(start, end);
  
      divid(start, mid);
      divid(mid + 1, end);
      merge(start, mid, end);
    }
  }

  function merge(start, mid, end) {
    let l = start;    // 左侧部分的指针
    let r = mid + 1;  // 右侧部分的指针
    temp = [];
    let tempSum = 0;

    while(l <= mid && r <= end) {
      if (array[l] < array[r]) {
        // 当左侧部分指针上的数，小于右侧的，则说明左侧数需要加进临时小和中
        // 临时小和：关注右侧某一个数时，左侧所有小于该数的数字之和
        tempSum += array[l];
        temp.push(array[l]);
        l++;
      }
      else {
        // 当右侧数小的时候，把该数的临时小和都加到总小和中
        sum += tempSum;
        temp.push(array[r]);
        r++;
      }
    }

    while(l <= mid) {
      temp.push(array[l]);
      l++;
    }

    while(r <= end) {
      sum += tempSum;
      temp.push(array[r]);
      r++;
    }

    for(let i=0; i<temp.length; i++) {
      array[start + i] = temp[i];
    }

  }
}

function getMid(l, r) {
  return Math.floor(l + ((r - l) / 2));
}

// 测试代码
console.log(smallSumByMerge(arr.concat()));
console.log(smallSumByMerge(arr2.concat()));


/**
 * 归并排序延伸解法2，比较好的做法，跟1只有一点点不同
 */
function smallSumByMerge2(array) {
  if (array.length < 1) return 0;

  let sum = 0;
  let temp = [];

  divid(0, array.length - 1);

  return sum;

  function divid(start, end) {
    if (start < end) {
      let mid = getMid(start, end);
  
      divid(start, mid);
      divid(mid + 1, end);
      merge(start, mid, end);
    }
  }

  function merge(start, mid, end) {
    let l = start;    // 左侧部分的指针
    let r = mid + 1;  // 右侧部分的指针
    temp = [];

    while(l <= mid && r <= end) {
      if (array[l] < array[r]) {
        // 计算小和的关键一步，当左侧数小于右侧某个数时，左侧数一定小于右侧数后面的所有的数，所以要 左侧数 * (end - r + 1)
        sum += array[l] * (end - r + 1);
        temp.push(array[l]);
        l++;
      }
      else {
        temp.push(array[r]);
        r++;
      }
    }

    while(l <= mid) {
      temp.push(array[l]);
      l++;
    }

    while(r <= end) {
      temp.push(array[r]);
      r++;
    }

    for(let i=0; i<temp.length; i++) {
      array[start + i] = temp[i];
    }

  }
}

// 测试代码
console.log(smallSumByMerge2(arr.concat()));
console.log(smallSumByMerge2(arr2.concat()));