const BinaryTree = require('./BinaryTree');
const BST = require('./03.BST');
/**
 * 判断是否为 xx 类型的二叉树
 */

const root1 = BinaryTree.create([1,2,3,null,4,5,null,6,null,7,8,9,10]);
console.log('root1', root1);
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
