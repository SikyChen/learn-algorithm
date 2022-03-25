
const BinaryTree = require('./BinaryTree');

/**
 * 通过栈+遍历的方式，做前序、中序、后续遍历
 */

/** 二叉树 */
const root = BinaryTree.create([1,2,3,null,4,5,null,6,null,7,8,9,10]);
//            1
//      2           3
//  nu    4       5     nu
//      6  nu    7  8
//    9  10
// 
// 前序遍历结果
// 1,2,4,6,9,10,3,5,7,8
// 中序遍历结果
// 2,9,6,10,4,1,7,5,8,3
// 后续遍历结果
// 9,10,6,4,2,7,8,5,3,1
console.log(root);
console.log('=========================================');

/**
 * 前序遍历
 * 
 * 二叉树
 *      1
 *   2     3
 * 4  5   6  7
 * 头结点 1，入栈
 * 
 * 栈： [1] ->
 * 栈长度不为0，第一个节点出栈
 * 此时是头节点出栈，即 1 出栈，打印
 * 将出栈的节点，取其 right 、 left 节点依次入栈，即 3、2 入栈。注意此处是先右后左
 * 
 * 栈： [3, 2] ->
 * 栈长度不为0，第一个节点出栈
 * 此时是刚刚的左节点出栈，即 2 出栈，打印
 * 将出栈的节点，取其 right 、 left 节点依次入栈，即 5、4 入栈。
 * 
 * 栈： [3, 5, 4] ->
 * 出栈 4 并打印
 * 取节点 4 的右、左节点，由于都为 null ，无节点入栈
 * 
 * 栈： [3, 5] ->
 * 出栈 5 并打印
 * 取节点 5 的右、左节点，由于都为 null ，无节点入栈
 * 
 * 栈： [3] ->
 * 出栈 3 并打印
 * 取节点 3 的右、左节点，7、6 入栈
 * 
 * 栈： [7, 6] ->
 * 出栈 6 并打印
 * 取节点 6 的右、左节点，由于都为 null ，无节点入栈
 * 
 * 栈： [7] ->
 * 出栈 7 并打印
 * 取节点 7 的右、左节点，由于都为 null ，无节点入栈
 * 
 * 栈： [] ->
 * 栈为空，结束
 * 
 * 打印顺序为： 1,2,4,5,3,6,7 符合先序遍历
 */
function preOrder(root) {
  if (!root) return [];

  let res = [];
  let stack = [root];

  while(stack.length) {
    
    let node = stack.pop();
    // 相当于打印操作
    res.push(node.val);

    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return res;
}

console.log(preOrder(root).join(','));
console.log('=========================================');


/**
 * 中序遍历
 * 
 * 二叉树
 *      1
 *   2     3
 * 4  5   6  7
 * 
 * 从头节点开始，将所有左子节点依次压入栈中，直到没有左子节点
 * [1,2,4]
 * 
 * 弹出一个节点，打印，检查它有没有右节点，如果有右节点，将该右节点做第一步的事情，把它的所有左子节点压入栈
 * 此处得到 4 ，打印，没有右节点，跳过
 * [1,2]
 * 
 * 弹出一个节点，打印，检查它有没有右节点，如果有右节点，将该右节点做第一步的事情，把它的所有左子节点压入栈
 * 此处得到 2 ，打印，有右节点 5 ，5 没有左子节点了，所以只压入 5
 * [1,5]
 * 
 * 弹出一个节点，打印，检查它有没有右节点，如果有右节点，将该右节点做第一步的事情，把它的所有左子节点压入栈
 * 此处得到 5 ，打印，没有右节点，跳过
 * [1]
 * 
 * 弹出节点 1 ，打印，有右节点 3 ，右节点 3 有左节点，依次将所有左子节点压入栈
 * [3,6]
 * 
 * 弹出节点 6 ，打印，没有右节点
 * [3]
 * 
 * 弹出节点 3 ，打印，有右节点 7 ，7 没有左子节点了，只压入 7
 * [7]
 * 
 * 弹出节点 7 ，打印，没有右节点
 * []
 * 
 * 栈空了，结束
 * 依次打印结果为：4,2,5,1,6,3,7
 */
function inOrder(root) {
  if (!root) return [];

  let res = [];
  let node = root;
  let stack = [];

  while(node || stack.length) {

    while(node) {
      stack.push(node);
      node = node.left;
    }
    console.log('stack', stack.map(item => item.val))
    node = stack.pop();
    res.push(node.val);

    node = node.right;
  }

  return res;
}

const root2 = BinaryTree.create([1,2,3,4,5,6,7]);
console.log(inOrder(root2).join(','));
console.log(inOrder(root).join(','));
console.log('=========================================');