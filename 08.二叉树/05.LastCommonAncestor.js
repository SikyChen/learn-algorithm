
/**
 * 最小公共父节点
 * 
 * 假设二叉树 root 中包含 p 和 q 两个节点，求他们的最小公共父节点
 * 
 * LeetCode [236] 二叉树的最近公共祖先
 */

/**
 * 最小公共父节点
 * 
 * 方法一
 * 1. 将每个节点 -> 父节点 的映射，存在 Map 中，这样就可以通过 Map 来找到每个节点的父节点
 * 2. 使用 Map 找到 p 所有的父节点，存到 Set 中
 * 3. 使用 Map 查找 q 所有的父节点，每次找到一个局节点，就判断是否 Set 中存在，第一个存在的节点，就是最小公共父节点
 * 
 * 好理解，但速度较慢，空间浪费也比较多
 */
function LastCommonAncestor(root, p, q) {
  let map = new Map();
  map.set(root, null);

  (function process(root) {
    if (!root) return null;

    root.left && map.set(root.left, root);
    root.right && map.set(root.right, root);

    process(root.left);
    process(root.right);
  })(root);

  // 现在得到了 map

  let set = new Set();
  while(p !== root) {
    set.add(p);
    p = map.get(p);
  }

  // 现在得到了 set

  while(q !== root) {
    if (set.has(q)) {
      return q;
    }
    q = map.get(q);
  }

  return root;
}

/**
 * 最小公共父节点
 * 
 * 方法二：
 * 1. 使用递归方法
 * 2. BaseCase(停止递归的条件) 为当前节点为 null ，或为 p 或 q，返回当前节点
 * 3. 后序判断当前节点子树，其左右子节点是否分别包含 p 和 q，如果是的话，则当前节点是最小公共父节点，返回
 * 4. 如果不是，则后序返回当前节点子树包含的 p 或 q 的信息，如果不包含就返回 null
 * 
 * 速度比较快，空间O(1)
 */
function LastCommonAncestor2(root, p, q) {
  return (function process(root, p, q) {
    if (!root || root === p || root === q) {
      return root;
    }

    const left = process(root.left, p, q);
    const right = process(root.right, p, q);
    
    // 此时当前节点为最小公共父节点
    if (left && right) {
      return root;
    }

    return left ? left : right;
  })(root, p, q);
}
