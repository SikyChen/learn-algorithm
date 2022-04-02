/**
 * 查找一个节点的后继节点
 * 
 * 后继节点：中序遍历的顺序中，当前节点的下一个节点，成为其后继节点
 * 前驱结点：中序遍历的顺序中，当前节点的前一个节点，称为其前驱结点
 * 注：每个节点都有一个 parent 属性指向其父节点
 * 
 *           1
 *        2     3
 *      4  5   6  7
 *        8 9 
 * 规则：
 * 1. 若当前节点有右子节点，它的后继节点为它的右子节点的最左子节点；
 *      （例如 1 的右子节点为 3，3 的最左子节点为 6，故 1 的后继节点为 6）
 *      （例如 3 的右子节点为 7，7 的最左子节点没有，那么久是它自己本身，故 3 的后继节点为 7）
 * 2. 若当前节点没有右子节点，依次向上找到父节点
 *   1）若某父节点是父父节点的左子节点，则其后继节点为父父节点
 *      （例如 9 没有右子节点，依次向上找到父节点 5，5 不是其父节点 2 的左子节点，所以继续向上找；
 *                            向上找到父节点 2，2 是其父节点 1 的左子节点，所以 9 的后继节点为 1）
 *   2）若向上找父节点一直到 null，都没有找到符合 2.1 的条件，那么说明它是最后一个节点
 *      （例如 7 没有右子节点，向上找到 3 ，在向上找到 1，在向上找到 null， 
 *                都不是左子节点，所以 7 是最后一个节点，后继节点为 null）
 */

/**
 * 查找
 */
class BinaryTree {
  constructor(val, left, right, parent) {
    this.val = val || null;
    this.left = left || null;
    this.right = right || null;
    this.parent = parent || null;
  }
}

function getNextNode(node) {
  if (node.right) {
    let res = node.right;
    while(res.left) {
      res = res.left
    }
    return res;
  }
  else {
    let res = node;
    while (res.parent && res === res.parent.right) {
      res = res.parent;
    }
    return res.parent ? res.parent : null;
  }
}
