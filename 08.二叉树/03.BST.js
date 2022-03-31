/**
 * 二叉搜索树/二叉排序树
 * Binary Search Tree / Binary Sort Tree
 * 
 * 具有以下特点：
 * 1. 如果有左子树，则左子树上的数字，都小于根节点
 * 2. 如果有右子树，则右子树上的数字，都大于根节点
 * 3. 左右子树也遵循1、2的规则
 * 4. 空树也可以算是二叉搜索树
 * 
 * 需要支持的方法：
 * - insert 插入新节点
 * - search 根据值搜索某个节点
 * - inOrder 中序遍历
 * - preOrder 前序遍历
 * - postOrder 后序遍历
 * - min 返回最小值
 * - max 返回最大值
 * - remove 移除某个值
 */
class BST {
  constructor(val, left, right) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }

  /** 插入一个新节点 */
  insert(val) {
    if (!val && val !== 0) {
      console.error(`WARN: insert expect a val, but got a ${val}`);
      return false;
    }

    if (this.val === null) {
      this.val = val;
    }
    else {
      const newNode = new BST(val);
      insertNode(this, newNode);
    }

    function insertNode(node, newNode) {
      // 新节点比根节点小，则跟左子节点相比较
      if (node.val > newNode.val) {
        if (node.left) {
          insertNode(node.left, newNode);
        }
        else {
          node.left = newNode;
        }
      }
      // 新节点比根节点大，则跟右子节点比较
      else if (node.val < newNode.val) {
        if (node.right) {
          insertNode(node.right, newNode);
        }
        else {
          node.right = newNode;
        }
      }
      // 相等则报错
      else {
        console.error(`WARN: ${val} had been inserted before.`);
        return false;
      }
    }
  }

  /** 根据节点值从搜索二叉树中查询对应节点，若无该节点则返回 null */
  search(val) {
    const searchNode = (node, val) => {
      // 比节点小，则取左子节点上找
      if (val < node.val) {
        if (node.left) {
          return searchNode(node.left, val);
        }
        else {
          return null;
        }
      }
      // 比当前节点大，则去右子节点上找
      else if (val > node.val) {
        if (node.right) {
          return searchNode(node.right, val)
        }
        else {
          return null;
        }
      }
      // 相等说明找到了，返回即可
      else {
        return node;
      }
    }

    return searchNode(this, val);
  }

  /** 中序遍历 */
  inOrder() {
    let cur = this;
    let stack = [];
    let res = [];

    while (cur || stack.length) {
      if (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      else {
        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
      }
    }

    return res;
  }

  /** 前序遍历 */
  preOrder() {
    let cur = this;
    let stack = [];
    let res = [];

    while (cur || stack.length) {
      if (cur) {
        res.push(cur.val);
        stack.push(cur);
        cur = cur.left;
      }
      else {
        cur = stack.pop();
        cur = cur.right;
      }
    }

    return res;
  }

  /** 后序遍历 */
  postOrder() {
    let cur = this;
    let stack = [];
    let res = [];

    while (cur || stack.length) {
      if (cur) {
        res.push(cur.val);
        stack.push(cur);
        cur = cur.right;
      }
      else {
        cur = stack.pop();
        cur = cur.left;
      }
    }

    return res.reverse();
  }

  /** 返回当前搜索二叉树中的最小节点 */
  min() {
    let cur = this;

    while (cur.left) {
      cur = cur.left;
    }

    return cur;
  }

  /** 返回当前搜索二叉树中的最大节点 */
  max() {
    let cur = this;

    while (cur.right) {
      cur = cur.right;
    }

    return cur;
  }

  /**
   * 根据节点值，移除某一节点
   * 1. 找到节点的方式，跟search类似
   * 2. 找到节点移除，需要将该位置补充上，补充节点可以来自于该右子树上的最小节点
   * @param {*} val 节点值
   * @returns this
   */
  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null;

      if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      }
      else if (val > node.val) {
        node.right = removeNode(node.right, val);
        return node;
      }
      else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        // 使用当前节点的右子树上的最小节点，来替换掉当前节点，并把该节点删除
        // 注：此处既可以使用右子树的最小节点，也可以使用左子树的最大节点，结果树虽然不同，但都正确
        node.val = node.right.min().val;
        removeNode(node.right, node.val);
        return node;
      }
    }

    return removeNode(this, val);
  }

  /**
   * 静态方法，判断一个二叉树是否是二叉搜索树
   * 中序遍历，然后检查后面的数字是否大于前面的数字，如果不是则返回null，否则返回true
   */
  static isBST(root) {
    let cur = root;
    let preVal = -Infinity;
    let stack = [];

    while (cur || stack.length) {
      if (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      else {
        cur = stack.pop();
        if (cur.val <= preVal) {
          return false;
        }
        preVal = cur.val;
        cur = cur.right;
      }
    }

    return true;
  }

}

module.exports = BST;

// const root = new BST();
// console.log(root);
// root.insert(7);
// root.insert(3);
// root.insert(9);
// root.insert(5);
// root.insert(4);
// root.insert(14);
// root.insert(6);
// root.insert(2);
// root.insert(8);
// root.insert(10);
// root.insert(1);
// root.insert(13);
// root.insert(11);
// console.log(root)
// console.log(root.search(5));
// console.log(root.inOrder().toString());
// console.log(root.preOrder().toString());
// console.log(root.postOrder().toString());
// console.log(root.min());
// console.log(root.max());
// console.log('remove', root.remove(13));
// console.log('root is BST: ', BST.isBST(root));
// console.log('=========================================');

// const BinaryTree = require('./BinaryTree');
// const root1 = BinaryTree.create([1,2,3,4,5,6,7]);
// console.log('root1 is BST: ', BST.isBST(root1));

