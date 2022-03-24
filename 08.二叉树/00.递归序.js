const BinaryTree = require('./BinaryTree');

/**
 * 二叉树的递归序，就是
 * 前序遍历：头->左->右
 * 中序遍历：左->头->右
 * 后序遍历：左->右->头
 */
function traverse(root) {
  if (!root) {
    return null;
  }
  // 前序位置
  traverse(root.left);
  // 中序位置
  traverse(root.right);
  // 后序位置
}

/** 二叉树 */
const root = BinaryTree.create([1,2,3,4,5,6,7,8,9,10]);
console.log(root);
console.log('=========================================');


/** 前序递归遍历并打印 */
function preOrder(root, res=[]) {
  if (!root) return null;

  res.push(root.val)
  preOrder(root.left, res);
  preOrder(root.right, res);

  return res;
}

console.log(preOrder(root).join(','));
console.log('=========================================');


/** 中序递归遍历并打印 */
function inOrder(root, res=[]) {
  if (!root) return null;

  inOrder(root.left, res);
  res.push(root.val)
  inOrder(root.right, res);

  return res;
}

console.log(inOrder(root).join(','));
console.log('=========================================');


/** 后序递归遍历并打印 */
function postOrder(root, res = []) {
  if (!root) return null;

  postOrder(root.left, res);
  postOrder(root.right, res);
  res.push(root.val);

  return res;
}

console.log(postOrder(root).join(','));
console.log('=========================================');