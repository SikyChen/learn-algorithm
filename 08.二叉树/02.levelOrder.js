const BinaryTree = require('./BinaryTree');

/**
 * 二叉树的层序遍历
 */

/** 二叉树 */
const root = BinaryTree.create([1,2,3,4,5,6,7]);
console.log('root', root);
// [[1],[2,3],[4,5,6,7]]
const root1 = BinaryTree.create([1,2,3,null,4,5,null,6,null,7,8,9,10]);
console.log('root1', root1);
console.log('=========================================');

//            1
//      2           3
//  nu    4       5     nu
//      6  nu    7  8
//    9  10
// 层序遍历结果
// [[1],[2,3],[4,5],[6,7,8],[9,10]]

/**
 * 使用两个队列进行层序遍历，分别为 queue 和 help
 * 
 * 二叉树
 *      1
 *   2     3
 * 4  5   6  7
 * 头结点 1，入队列 help
 * queue=[]
 * help=[1]
 * 
 * 队列 queue 为空，则将 help 队列内容打印
 * 打印 [1]
 * 将 help 队列内节点依次出队，并进入 queue
 * queue=[1]
 * help=[]
 * 
 * 队列 queue 不为空，弹出 1 ，取其左右子节点 left 和 right 入 help 队列
 * queue=[]
 * help=[2,3]
 * 
 * 队列 queue 为空，则将 help 队列内容打印
 * 打印 [2,3]
 * 将 help 队列内节点依次出队，并进入 queue
 * queue=[2,3]
 * help=[]
 * 
 * 队列 queue 不为空，弹出 2 ，取其左右子节点 left 和 right 入 help 队列
 * queue=[3]
 * help=[4,5]
 * 
 * 队列 queue 不为空，弹出 3 ，取其左右子节点 left 和 right 入 help 队列
 * queue=[]
 * help=[4,5,6,7]
 * 
 * 队列 queue 为空，则将 help 队列内容打印
 * 打印 [4,5,6,7]
 * 将 help 队列内节点依次出队，并进入 queue
 * queue=[4,5,6,7]
 * help=[]
 * 
 * 队列 queue 不为空，弹出 4 ，没有子节点跳过
 * queue=[]
 * help=[5,6,7]
 * 
 * 队列 queue 不为空，弹出 5 ，没有子节点跳过
 * queue=[]
 * help=[6,7]
 * 
 * 队列 queue 不为空，弹出 6 ，没有子节点跳过
 * queue=[]
 * help=[7]
 * 
 * 队列 queue 不为空，弹出 7 ，没有子节点跳过
 * queue=[]
 * help=[]
 * 
 * 两个队列都为空，结束
 * 打印结果 [1], [2,3], [4,5,6,7]
 * 
 */
function levelOrder(root) {
  if (!root) return [];

  let queue = [];
  let help = [root];
  let res = [];

  while(queue.length || help.length) {
    if (!queue.length) {
      res.push(help.map(node => node.val));
      queue.push(...help);
      help = [];
    }
    else {
      let cur = queue.shift();
      cur.left && help.push(cur.left);
      cur.right && help.push(cur.right);
    }
  }

  return JSON.stringify(res);
}

console.log(levelOrder(root));
console.log(levelOrder(root1));
console.log('=========================================');


/**
 * 使用一个队列进行层序遍历 queue
 * 记录每一层的宽度，使用宽度把当前层节点都遍历完，然后再到下一层进行遍历
 * 
 * 二叉树
 *      1
 *   2     3
 * 4  5   6  7
 * 头节点 1 进入队列 queue
 * [1]
 * 
 * > 打印第一层 [1]
 * 队列当前长度，即为当前成（第一层）宽度，记录
 * levelWidth = queue.length = 1
 * 
 * 使用宽度 1 遍历，即第一层遍历一次
 * 第1次 -> 队列 queue 出队 1 ，取其 left 和 right 入队
 *   [2,3]
 * 
 * > 打印第二层 [2,3]
 * 队列当前长度，记录为宽度（第二层）
 * levelWidth = queue.length = 2
 * 
 * 使用宽度 2 遍历，第二层遍历2次
 * 第1次 -> 队列 queue 出队 2 ，取其 left 和right 入队
 *   [3,4,5]
 * 第2次 -> 队列 queue 出队 3 ，取其 left 和right 入队
 *   [4,5,6,7]
 * 
 * > 打印第三层 [4,5,6,7]
 * 队列当前长度，记录为宽度（第三层）
 * levelWidth = queue.length = 4
 * 
 * 使用宽度 4 遍历，第三层遍历4次
 * 第1次 -> 队列 queue 出队 4 ，无子节点跳过
 * 第2次 -> 队列 queue 出队 5 ，无子节点跳过
 * 第3次 -> 队列 queue 出队 6 ，无子节点跳过
 * 第4次 -> 队列 queue 出队 7 ，无子节点跳过
 * 
 * > queue 为空，结束
 * 打印结果 [1], [2,3], [4,5,6,7]
 * 
 */
function levelOrder1(root) {
  let res = [];

  if (!root) return res;

  let queue = [root];
  while(queue.length) {
    // 打印
    res.push(queue.map(node => node.val));

    // 记录宽度
    const levelWidth = queue.length;
    for(let i=0; i<levelWidth; i++) {
      let cur = queue.shift();
      cur.left && queue.push(cur.left);
      cur.right && queue.push(cur.right);
    }
  }

  return JSON.stringify(res);
}

console.log(levelOrder1(root));
console.log(levelOrder1(root1));
console.log('=========================================');


/**
 * 计算二叉树的最大宽度
 * 每层的宽度就是，每一层的节点数，最大宽度就是节点数最多的一层的数量
 * 例如 root 二叉树，最大宽度是第 3 层，共 4 个节点，则宽度为 4
 * 例如 root1 二叉树，最大宽度是第 4 层，共 3 个节点[6,7,8]，则宽度为 3
 * 
 * 只需要在 levelOrder1 的算法中，计算每层宽度的时候，跟最大宽度比较并记录一下即可
 */
function getMaxWidth(root) {
  let maxWidth = 0;

  if (!root) return maxWidth;

  let queue = [root];

  while(queue.length) {
    // 记录宽度
    let levelWidth = queue.length;
    // 记录最大宽度
    maxWidth = maxWidth > levelWidth ? maxWidth : levelWidth;

    for(let i=0; i<levelWidth; i++) {
      let cur = queue.shift();
      cur.left && queue.push(cur.left);
      cur.right && queue.push(cur.right);
    }
  }

  return maxWidth;
}

console.log(getMaxWidth(root));
console.log(getMaxWidth(root1));
console.log('=========================================');
