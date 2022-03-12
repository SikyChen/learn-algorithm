/**
 * 堆，是一种完全二叉树
 * 二叉树从上到下、从左到右的节点下标，可以跟数组的节点下标做对应。那么就可以用数组来表示堆
 * 
 *             0
 *       1          2
 *   3      4     5     6
 * 7  8   9
 * 
 * 上面的完全二叉树实际数据结构是数组来表示的
 * [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * 
 * 那么每个节点都有了对应的下标
 * 
 * 比如 5 这个节点的下标是 5 ，它是父节点 2(下标也为2) 的左侧子节点，则可通过父节下标点算出它的下标位置： 5 = 2 * 2 + 1；
 * 比如 8 这个节点的下标是 8 ，它是父节点 3(下标也为3) 的右侧子节点，则可通过父节下标点算出它的下标位置： 5 = 3 * 2 + 2；
 * 
 * 则可知，若一个父节点的下标为 i ，则其左侧自己点的下标是 (i+1) * 2 - 1 == 2i + 1 ，其右侧子节点的下标是 2i + 2
 * getLeftSonIndex / getRightSonIndex
 * 
 * 若一个子节点的下标为 i ,则其父节点的下标为 Math.floor((i-1)/2)
 * getFatherIndex
 * 
 * 若一个节点的下标为 0，则说明它是根节点
 * isRoot
 * 
 * 交换一个节点和其父节点的位置，就是使用节点的下标和其父节点的下标，通过 swap 方法交换两个节点在数组中的位置即可
 * swap(i, getFatherIndex(i))
 * 
 * 交换一个节点和其左侧子节点的位置
 * swap(arr, i, getLeftSonIndex(i))
 * 
 * 交换一个节点和其右侧子节点的位置
 * swap(arr, i, getRightSonIndex(i))
 */

/** 获取左侧子节点的下标 */
function getLeftSonIndex(i) {
  return 2 * i + 1;
}

/** 获取右侧子节点的下标 */
function getRightSonIndex(i) {
  return 2 * i + 2;
}

/** 获取父节点的下标 */
function getFatherIndex(i) {
  return Math.floor((i - 1) / 2);
}

function isRoot(i) {
  return i === 0;
}

/** 交换位置 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// exports.getFatherIndex = getFatherIndex;

module.exports = {
  getLeftSonIndex,
  getRightSonIndex,
  getFatherIndex,
  isRoot,
  swap,
}