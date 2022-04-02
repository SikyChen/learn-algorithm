/**
 * 思维拓展
 */

const BinaryTree = require('./BinaryTree');

/**
 * 纸条问题
 * 
 * 一张纸条，固定左边，将右边不停向左侧对折
 * --------------------------------
 * 1. 当第一次对折后展开，中间的折痕是凹下去的，记为 0
 * ----------------------0----------------------
 * 2. 当第二次对折后展开，中间共三条折痕，分别是，凹凹凸
 * ----------0-----------0-----------1----------
 * 3. 当第三次对折后展开，中间的折痕为
 * ----0-----0-----1-----0-----0-----1-----1----
 * 4. 当第四次对折后展开，中间的折痕为
 * -0--0--1--0--0--1--1--0--0--0--1--1--0--1--1-
 */
/**
 *                       0
 *           0                       1
 *     0           1           0           1
 *  0     1     0     1     0     1     0     1
 */
function getPaperMark(n) {
  const count = (Math.pow(2, n) - 1);
  let arr = [0];
  for(let i=1; i<count; i++) {
    arr.push(i%2 === 1 ? 0 : 1);
  }
  const root = BinaryTree.create(arr);
  arr = [];

  function process(root) {
    if (!root) return null;
    
    process(root.left);
    arr.push(root.val);
    process(root.right);
  }

  process(root);
  
  console.log('Output: ', arr.join(','));
}

getPaperMark(4);