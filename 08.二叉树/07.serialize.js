const BinaryTree = require('./BinaryTree');

// 检查是否相同树
function isSameTree(root1, root2) {
  if (root1 === null && root2 === null) return true;
  if (root1 === null || root2 === null) return false;
  if (root1.val !== root2.val) return false;

  return isSameTree(root1.left, root2.left) && isSameTree(root1.right, root2.right);
}

const root = BinaryTree.create([1, 2, 3, null, null, 4, 5, 6, 7]);
console.log(root);
console.log('=========================================');

/**
 * 二叉树的序列化和反序列化
 * 
 * 对于js来说，
 * 序列化就是将二叉树由对象结构转为字符串结构，方便存储与传输；
 * 反序列化就是将字符串结构解为对象结构
 * 
 * 很明显，一个 JSON.stringify + JSON.parse 就可以解决所有问题 🍺
 */

/**
 * 使用 JSON.stringify 进行序列化
 * @param {BinaryTree} root 二叉树对象
 * @returns {String} 序列化后的字符串
 */
function serialize(root) {
  return JSON.stringify(root);
}

/**
 * 使用 JSON.parse 进行反序列化
 * @param {String} data 序列化后的字符串
 * @returns {BinaryTree} 反序列化后的二叉树对象
 */
function deserialize(data) {
  return JSON.parse(data);
}

const str1 = serialize(root);
const rootCopy1 = deserialize(str1);
console.log(str1);
console.log(rootCopy1);
console.log(isSameTree(root, rootCopy1));
console.log('=========================================');


/**
 * JSON对象还是清晰的描述了原对象的结构和层级，体积应该比较大
 * 
 * 在 LeetCode 中描述二叉树的方式是
 * [1,2,3,null,null,4,5,6,7]
 *        1
 *    2      3
 *         4   5
 *       6  7
 * 
 * 这是一种使用层序遍历顺序进行序列化和反序列化的方式，在我的 BinaryTree.create() 方法中，就实现了该反序列化方法
 */

/**
 * 中序遍历的序列化
 * 
 * 只需要进行中序遍历，并将二叉树的节点值，依次放入 res 的数组中即可
 * 
 * @param {BinaryTree} root 二叉树对象
 * @returns {Array} 序列化后的数组
 */
function serialize2(root) {
  let queue = [root];
  let cur = null;
  let res = [];

  while (cur || queue.length) {
    cur = queue.shift();

    res.push(cur ? cur.val : null);

    if (cur) {
      queue.push(cur.left);
      queue.push(cur.right);
    }
  }

  return res;
}

/**
 * 中序遍历的反序列化
 * 
 * 从头节点开始，每创建一个节点，就放入队列中
 * 从队列中依次取出节点，将新创建的节点依次赋值给其左右作为子节点
 * 
 * 思路跟 BinaryTree.create 是一样的
 * 
 * @param {Array} array 序列化后的数组
 * @returns {BinaryTree} 二叉树对象
 */
function deserialize2(array) {
  if (!array || !array.length) return null;

  let root = new BinaryTree(array[0]);
  let queue = [root];
  let queueIndex = 0;
  let cur = null;
  let i = 1;

  while (i < array.length) {
    cur = queue[queueIndex];

    if (!cur) {
      queueIndex++;
      continue;
    }

    let node = array[i] === null ? null : new BinaryTree(array[i]);
    if (!cur.hasSetLeft) {
      cur.left = node;
      queue.push(cur.left);

      cur.hasSetLeft = true;
      i++;
    }
    else {
      cur.right = node;
      queue.push(cur.right);
      delete cur.hasSetLeft;

      queueIndex++;
      i++
    }
  }

  if (cur.hasSetLeft) {
    delete cur.hasSetLeft;
  }

  return root;
}

const array2 = serialize2(root);
const rootCopy2 = deserialize2(array2);
console.log(array2);
console.log(rootCopy2);
console.log(isSameTree(root, rootCopy2));
console.log('=========================================');


/**
 * 前序遍历的序列化
 * 
 * 序列化的结果，终于是普通字符串啦
 * 通过前序遍历，节点值之间使用 ',' 隔开，空节点使用 '#' 进行表示
 * 
 *        1
 *    2      3
 *         4   5
 *       6  7
 * 此树的前序遍历序列化结果为 1,2,#,#,3,4,6,#,#,7,#,#,5,#,#
 * 
 * @param {BinaryTree} root 二叉树对象
 * @returns {String} 序列化后的字符串
 */
function serialize3(root) {

  function process(root, res) {
    if (!root) {
      return res += ',#';
    }

    res = res ? `${res},${root.val}` : root.val;
    res = process(root.left, res);
    res = process(root.right, res);

    return res;
  }

  return process(root, '');
}

/**
 * 前序遍历的反序列化
 * 
 * @param {String} string 序列化后的字符串
 * @returns {BinaryTree} 二叉树对象
 */
function deserialize3(string) {
  let array = string.split(',');
  let i = -1;

  function process() {
    i++;
    if (i >= array.length) return null;
    if (array[i] === '#') return null;

    let cur = new BinaryTree(isNaN(array[i]) ? array[i] : Number(array[i]));

    cur.left = process();
    cur.right = process();

    return cur;
  }

  return process();
}

const str3 = serialize3(root);
console.log(str3);
const rootCopy3 = deserialize3(str3);
console.log(rootCopy3);
console.log(isSameTree(root, rootCopy3));
console.log('=========================================');
