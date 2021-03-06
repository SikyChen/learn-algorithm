
const BinaryTree = require('./BinaryTree');

/**
 * 通过栈+遍历的方式，做前序、中序、后续遍历
 * 
 * PS: 在 03.BST 中的二叉搜索树类中，用更简洁的方式实现了前中后序遍历
 *     但在本节的实现，详细描述了遍历过程，更有助于理解
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


/**
 * 后续遍历
 * 
 * 后续遍历是 左-右-头 ，那么如果按着 头-右-左 来入栈，然后再反过来顺序打印，就是 左-右-头 了；
 * 
 * 需要两个栈，一个叫 stack ，一个叫 help 。
 * 
 * 二叉树
 *      1
 *   2     3
 * 4  5   6  7
 * 
 * 头节点 1 入栈
 * stack=[1]
 * 开始循环，以 stack 不为空作为条件
 * 
 * stack 不为空
 * 弹出节点，将节点压入 help 栈中（这一步类似前序遍历的打印操作）
 * 判断该节点是否有左右子节点，若有则取该节点的 left right 节点，依次压入 stack 栈中，注意此处是 先左后右 （跟前序遍历相反）
 * 此次操作位，弹出节点 1 ，压入 help 中，取其 2 ，3 节点压入 stack
 * stack=[2,3]
 * help=[1]
 * 
 * stack 不为空
 * 弹出节点 3 ，压入 help 中，取其左右节点 6 ，7 压入 stack
 * stack=[2,6,7]
 * help=[1,3]
 * 
 * stack 不为空
 * 弹出节点 7 ，压入 help 中，它没有左右子节点了
 * stack=[2,6]
 * help=[1,3,7]
 * 
 * 弹出节点 6 ，压入 help 中，它没有左右子节点了
 * stack=[2]
 * help=[1,3,7,6]
 * 
 * 弹出节点 2 ，压入 help 中，取其左右节点 4 ，5 压入 stack
 * stack=[4,5]
 * help=[1,3,7,6,2]
 * 
 * 弹出节点 5 ，压入 help 中，它没有左右子节点了
 * stack=[4]
 * help=[1,3,7,6,2,5]
 * 
 * 弹出节点 4 ，压入 help 中，它没有左右子节点了
 * stack=[]
 * help=[1,3,7,6,2,5,4]
 * 
 * stack 空了，循环结束
 * 将 help 反转顺序打印（即从后往前打印）得到结果
 * 4,5,2,6,7,3,1
 */
function postOrder(root) {
  if (!root) return [];

  let res = [];
  let help = [];
  let stack = [root];

  while(stack.length) {
    let node = stack.pop();
    help.push(node);

    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  // 这里写的复杂，是为了跟前面遍历的打印操作做对应
  // 也就是说，这里是后序遍历真正对每个节点做处理的位置
  for (let i=help.length - 1; i>=0; i--) {
    let node = help[i];
    res.push(node.val);
  }
  return res;
}

console.log(postOrder(root2).join(','));
console.log(postOrder(root).join(','));
console.log('=========================================');
