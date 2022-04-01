const BinaryTree = require('./BinaryTree');
const BST = require('./03.BST');
/**
 * 判断是否为 xx 类型的二叉树
 */

const root1 = BinaryTree.create([1,2,3,null,4,5,null,6,null,7,8,9,10]);
console.log('root1', root1);
//            1
//      2           3
//  nu    4       5     nu
//      6  nu    7  8
//    9  10

const root2 = new BST();
[1,2,3,4,5,6,7,8,9].forEach(item => {
  root2.insert(item);
})
console.log('root2', root2);
console.log('root1 is BST', BST.isBST(root1));
console.log('root2 is BST', BST.isBST(root2));
console.log('=========================================');

/**
 * 是否搜索二叉树
 * 在 03.BST 中，有使用栈和遍历来判断
 */

/**
 * 是否搜索二叉树，使用递归判断
 */
function isBST(root) {
  function process(root) {
    if (!root) return {
      max: -Infinity,
      min: Infinity,
      isBST: true
    };

    let left = process(root.left);
    let right = process(root.right);

    return {
      max: Math.max(left.max, right.max, root.val),
      min: Math.min(left.min, right.min, root.val),
      isBST: left.isBST && right.isBST && (left.max < root.val) && (root.val < right.min)
    }
  }

  return process(root).isBST;
}

console.log('root1 is BST', isBST(root1));
console.log('root2 is BST', isBST(root2));
console.log('=========================================');


/**
 * 是否完全二叉树
 * 
 * 完全二叉树是指，一颗二叉树只有最低一层的节点可以不满，并且空出的位置都在最后面
 * 也就是说如果层序遍历的话，在结束之前是不会得到空节点的
 * 
 * 判断条件
 * 1. 当一个节点没有左子节点，但是有右子节点的时候，说明不是完全二叉树
 * 1. 如果一个节点有左子节点，但是它之后的节点还有子节点的时候，不是完全二叉树；它之后的节点都没有子节点的话，是完全二叉树
 * 
 * 使用层序遍历
 * 
 * 测试
 * 使用 LeetCode [958] 二叉树的完全性检验 做检验
 */
function isCompleteBinaryTree(root) {
  if (!root) return true;

  let cur = root;
  let queue = [cur];
  let currentIndex = 0;
  let isFinish = false;

  while(cur) {

    if (isFinish && (cur.left || cur.right)) {
      return false;
    }

    if (!cur.left && cur.right) {
      return false;
    }

    if (!cur.right) {
      isFinish = true;
    }

    cur.left && queue.push(cur.left);
    cur.right && queue.push(cur.right);

    cur = queue[++currentIndex];
  }

  return true;
}


/**
 * 是否为 满二叉树
 * 
 * 满二叉树是指，一个二叉树形成完整的三角形。即除了最下一层节点，都没有子节点，上层的节点，全都都有左右子节点的二叉树。
 * 
 * 递归法判断条件：
 * 1. 左子树是满二叉树，右子树也是满二叉树
 * 2. 左右子树的高度相同
 * 3. 空树也是满二叉树
 * 
 * 后序遍历，当前节点需要想左右子树获取的信息为：
 * 1. 是否为满二叉树
 * 2. 高度
 */
function isFullBinaryTree(root) {
  if (!root) return true;

  function process(root) {
    if (!root) return {
      isFull: true,
      height: 0,
    };

    let left = process(root.left);
    let right = process(root.right);

    return {
      isFull: left.isFull && right.isFull && (left.height === right.height),
      height: Math.max(left.height, right.height) + 1,
    }
  }

  return process(root).isFull;
}

const fullTree = BinaryTree.create([1,2,3,4,5,6,7]);
console.log('fullTree', fullTree);
console.log('fullTree isFull: ', isFullBinaryTree(fullTree));
console.log('root1 isFull: ', isFullBinaryTree(root1));
console.log('=========================================');

/**
 * 是否为 满二叉树
 * 
 * 满二叉树需要满足，若有 k 层，则总节点数，一定为 (2^k - 1) 个
 * 
 * 1. 查询二叉树的最大高度 k
 * 2. 计算节点数是否等于 (2^k - 1)
 * 
 * 这个方法，求高度和求节点数，都 2*O(n) 了，不咋推荐
 */
function isFullBinaryTree2(root) {
  if (!root) return true;

  // 来一个递归，同时计算最大高度和节点数量
  function getHeightAndCount(root) {
    if (!root) return {
      height: 0,
      count: 0,
    };
    const left = getHeightAndCount(root.left);
    const right = getHeightAndCount(root.right);
    return {
      height: Math.max(left.height, right.height) + 1,
      count: left.count + right.count + 1,
    }
  }

  const { height, count } = getHeightAndCount(root);
  return ( Math.pow(2, height) - 1 ) === count;
}
console.log('2 - fullTree isFull: ', isFullBinaryTree2(fullTree));
console.log('2 - root1 isFull: ', isFullBinaryTree2(root1));
console.log('=========================================');

/**
 * 是否为 满二叉树
 * 
 * 搞一个非递归的方法
 * 
 * 层序遍历，由于是满二叉树，每层的节点数应该是上层节点数量的2倍
 * 如果不符合，返回false即可
 */
function isFullBinaryTree3(root) {
  if (!root) return true;

  let queue = [root];
  let index = 0;
  let levelWidth = 1;
  let levelMaxWidth = 1;

  while(index < queue.length) {

    if (levelWidth < levelMaxWidth) {
      return false;
    }

    for(let i=0; i<levelWidth; i++) {
      let cur = queue[index];
      cur.left && queue.push(cur.left);
      cur.right && queue.push(cur.right);
      index++;
    }

    levelWidth = queue.length - index;
    levelMaxWidth = 2 * levelMaxWidth;
  }

  return true;
}
console.log('3 - fullTree isFull: ', isFullBinaryTree3(fullTree));
console.log('3 - root1 isFull: ', isFullBinaryTree3(root1));
console.log('=========================================');


/**
 * 是否为 平衡二叉树
 * 
 * 定义：任一节点的左右子树的高度差，不超过1
 * 
 * 递归法
 * 1. 向左右子树要信息如下：
 *    isBalanced: 是否平衡二叉树
 *    height: 树高度
 * 2. 比较左右子树高度差，看是否小于等于1
 */
function isBalanced(root) {
  function process(root) {
    if (!root) return {
      isBalanced: true,
      height: 0,
    }

    const left = process(root.left);
    const right = process(root.right);

    return {
      isBalanced: left.isBalanced && right.isBalanced && (Math.abs(left.height - right.height) <= 1),
      height: Math.max(left.height, right.height) + 1,
    }
  }

  return process(root).isBalanced;
}
const balanceTree = BinaryTree.create([1,2,3,4,5,6,7,8,9,10]);
console.log('balanceTree', balanceTree);
console.log('balanceTree isBalanced: ', isBalanced(fullTree));
console.log('root1 isBalanced: ', isBalanced(root1));
console.log('=========================================');

/**
 * 是否为 平衡二叉树
 * 
 * 精简一下写法，使用更少的空间
 */
function isBalanced2(root) {
  let isBalanced = true;

  (function process(root) {
    if (!root) return 0;

    const left = process(root.left);
    const right = process(root.right);

    if (Math.abs(left - right) > 1) {
      isBalanced = false;
    }

    return Math.max(left, right) + 1;

  })(root);

  return isBalanced;
}
console.log('2 - balanceTree isBalanced: ', isBalanced(fullTree));
console.log('2 - root1 isBalanced: ', isBalanced(root1));
console.log('=========================================');
