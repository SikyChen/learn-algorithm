// 数据结构
// 二叉树

/**
 * 二叉树类
 */
class BinaryTree {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  /**
   * 通过数组创建一棵树
   * 
   * 需要层序遍历当前二叉树
   */
  static create(array = []) {
    if (!array.length) return null;

    let root = new BinaryTree(array[0]);
    let queue = [root];
    let i = 1;
    let qIndex = 0;
    let cur = null;

    while (i < array.length) {
      cur = queue[qIndex];

      if (cur === null) {
        // 如果当前节点是 null ，则直接跳过当前节点
        qIndex++;
      }
      else {
        if (!cur.hasSetLeft) {
          cur.left = array[i] === null ? null : new BinaryTree(array[i]);
          cur.hasSetLeft = true;
          queue.push(cur.left);
          i++;
        }
        else {
          cur.right = array[i] === null ? null : new BinaryTree(array[i]);
          delete cur.hasSetLeft;
          queue.push(cur.right);
          i++;
          qIndex++;
        }
      }
    }

    cur.hasSetLeft && delete cur.hasSetLeft;

    return root;
  }
}

module.exports = BinaryTree;

// console.log(new BinaryTree(2));
// console.log(BinaryTree.create([1,null,2,3]));

// const bt = BinaryTree.create([1,2,3,4,5,6,7,8,9,10]);
// console.log(bt);
// console.log(JSON.stringify(bt))