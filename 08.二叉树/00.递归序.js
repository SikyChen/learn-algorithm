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
  dlr(root.left);
  // 中序位置
  dlr(root.right);
  // 后序位置
}