/**
 * 几乎有序的数组排序(小根堆扩展问题)
 * 
 * 描述：
 * 已知一个几乎有序的数组，几乎有序是指，如果把数组排好顺序的话，每个元素移动的距离可以不超过k，并且k相对于数组来说比较小。请选择一个合适的排序算法针对这个数据进行排序。
 * 
 * 分析：
 * 由于几乎有序，每个数和它排序之后的位置都不会超过 K ，所以可以知道，最小的数，如果在 k+1 的位置之后，那么它移动回 0 位置，距离就超过 k 了
 * 所以可知：最小值一定在 0 ~ k 之间；第二小的值，一定在 1 ~ k + 1 之间
 * 小根堆的优点是，可以知道顶部的数字一定是最小值
 * 所以可以求出 0 ~ k 的小根堆，最小值取出来放在 0 位置；
 * 而后可以求出 1 ~ k + 1 的小根堆，最小值取出来放在 1 位置；
 * 以此类推；
 * 
 * 最后的小根堆，依次取出最小值放入最后位置即可。
 * 
 */
function heapSortLessK(arr, k) {
  if (arr.length <= 1) return arr;

  for(let i=k; i<arr.length; i++) {
    buildSmallRootHeap(arr, i - k, i);
  }
  for(let i=arr.length - k - 1; i<arr.length; i++) {
    buildSmallRootHeap(arr, i, arr.length)
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function getFatherIndex(i) {
  return Math.floor((i - 1) / 2);
}

function buildSmallRootHeap(arr, start, end) {
  if (end - start < 1) return;

  for(let i=1; i<=end - start; i++) {
    let tempIndex = i;
    let fatherIndex = getFatherIndex(i);
    let realIndex = i + start;
    let realFatherIndex = fatherIndex + start;
    while(tempIndex > 0 && arr[realIndex] < arr[realFatherIndex]) {
      swap(arr, realIndex, realFatherIndex);
      tempIndex = fatherIndex;
      fatherIndex = getFatherIndex(tempIndex);
    }
  }
}

// 测试代码
const arr = [2,1,4,3,6,5,8,7,19,9,11,12,14,13,12];
const k = 3;
heapSortLessK(arr, k);
console.log(JSON.stringify(arr));