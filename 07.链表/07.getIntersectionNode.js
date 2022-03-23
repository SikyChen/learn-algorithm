/**
 * 链表相交
 * 给定两个链表 head1 和 head2 ，返回第一个相交的节点 node ，若不相交则返回 null
 */

const LinkedList = require('./LinkedList');
let head1 = new LinkedList(0);
[1, 2, 3].forEach(item => head1.append(item));

let head2 = new LinkedList(9);
[8, 7].forEach(item => head2.append(item));

const node = new LinkedList(4);
head1.getLast().next = node;
head2.getLast().next = node;
[5, 6].forEach(item => {
  head1.getLast().next = new LinkedList(item);
})

let head3 = new LinkedList(7);
[8, 9, 10].forEach(item => head3.append(item));

head1.print(); // 0,1,2,3,4,5,6
head2.print(); // 9,8,7,4,5,6
head3.print(); // 7,8,9,10
console.log('=========================================');

/**
 * 方法一
 * 使用 Set 存储 head1 的所有节点，
 * 然后遍历 head2 ，如果 head2 的某一个节点在 Set 中存在，则说明是第一次相交的节点，后面的节点都存在
 * 若一直都不存在，则说明不相交，返回 null
 */
function getIntersectionNode(head1, head2) {
  const set = new Set();
  const set2 = new Set(); // 用于避免 head2 链表带环

  let cur = head1;
  while (cur) {
    if (set.has(cur)) {
      // 若遇到重复节点，说明链表带环，重复的节点不必继续添加
      break;
    }
    set.add(cur);
    cur = cur.next;
  }

  cur = head2;
  while (cur) {
    if (set.has(cur)) {
      return cur;
    }
    if (set2.has(cur)) {
      // 如果 head2 链表带环，且已经在环转了一圈，还没有遇到相交，那么说明就是没有相交的点
      return null;
    }
    set2.add(cur);
    cur = cur.next;
  }

  return null;
}

console.log(getIntersectionNode(head1, head2));
console.log(getIntersectionNode(head1, head3));
console.log('=========================================');

// 不用 Set 用 Map
function getIntersectionNode1(head1, head2) {
  const map = new Map();

  let cur = head1;
  while (cur) {
    if (map.has(cur)) {
      // 若遇到重复节点，说明链表带环，重复的节点不必继续添加
      break;
    }
    map.set(cur, 'head1');
    cur = cur.next;
  }

  cur = head2;
  while (cur) {
    if (map.get(cur) === 'head1') {
      return cur;
    }
    if (map.get(cur) === 'head2') {
      // 如果 head2 链表带环，且已经在环转了一圈，还没有遇到相交，那么说明就是没有相交的点
      return null;
    }
    map.set(cur, 'head2');
    cur = cur.next;
  }

  return null;
}

console.log(getIntersectionNode(head1, head2));
console.log(getIntersectionNode(head1, head3));
console.log('=========================================');


/**
 * 方法二（不支持带环的链表）
 * 
 * 记录 head1 和 head2 到最后一个节点的长度，即链表长度
 * 先比较最后一个节点是否相同，若不相同，则说明不相交，返回 null；
 * 若相同，则说明有相交，求出长度差值 n ，在较长的链表的第 n 个节点开始，两个链表同时遍历，遇到的第一个相同节点即使相交节点
 * 
 * 例：
 * head1 : 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
 * head2 :      9 -> 8 -> 7 -> 4 -> 5 -> 6
 * 长度差值为 1 ，
 * 所以从较长的 head1 的第 1 个节点开始遍历
 * 从较短的 head2 的第 0 个节点开始遍历
 * 当到 4 这个节点时，相同，即相交节点
 */
function getIntersectionNode2(head1, head2) {
  let len1 = 0;
  let len2 = 0;
  let last1 = null;
  let last2 = null;
  let cur1 = head1;
  let cur2 = head2;

  while (cur1 || cur2) {
    if (cur1) {
      len1++;
      last1 = cur1;
      cur1 = cur1.next;
    }
    if (cur2) {
      len2++;
      last2 = cur2;
      cur2 = cur2.next;
    }
  }

  if (last1 !== last2) {
    // 最后一个节点不同，说明不相交
    return null;
  }

  cur1 = head1;
  cur2 = head2;
  if (len1 > len2) {
    while(len1 - len2 > 0) {
      len1--;
      cur1 = cur1.next;
    }
  } else {
    while(len2 - len1 > 0) {
      len2--;
      cur2 = cur2.next;
    }
  }

  while(cur1) {
    if (cur1 === cur2) {
      return cur1;
    }
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
}

console.log(getIntersectionNode2(head1, head2));
console.log(getIntersectionNode2(head1, head3));
console.log('=========================================');


/**
 * 方法三
 * 判断两个可能有环的链表相交
 * 
 * 先判断两个链表是否有环
 * 如果一个有环，一个没有，则说明不相交
 * 如果都没有环，则按方法二处理
 * 如果都有环，可以给 head 的入环节点做个记录，当下一次到达这个节点的前一个节点，作为最后一个节点，然后再按方法二去进行处理
 * 
 * 例：
 * head1 : 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 3 ...
 * head2 :                     9 -> 8 -> 6 -> 7 -> 3 ...
 * 如上可知，head1 是在 3 位置入环，经历 3 -> 4 -> 5 -> 6 -> 7 -> 3 中间4个点，又回到 5 位置
 * 将 7 位置作为末尾位置
 * 遍历 head2 ，若 head2 不包含 7 节点，说明不相交
 * 
 * 若两链表相交
 * 以 7 节点作为末尾位置，重新计算两个链表的长度
 * len1 = 8
 * len2 = 4
 * 得到差值 4 
 * head1 从 4(第4位) 位置开始遍历
 * head2 从 9(第0位) 位置开始遍历
 * 当遍历到第一个相同的节点 6 时，可知 6 为第一个相交节点
 * 
 * 注：
 * 快慢指针跑带环链表
 * 第一次相遇后，从相遇位置到入环节点的距离 === 从起始位置到入环节点的距离
 */
function getIntersectionNode3(head1, head2) {
  let slow1 = head1;  // 慢指针
  let slow2 = head2;
  let fast1 = head1;  // 快指针
  let fast2 = head2;
  let len1 = 0;       // 链表的长度，如果有环，则为头到 end 节点的长度
  let len2 = 0;
  let end1 = null;    // 链表的尾节点，如果有环，则为环中的最后一个节点
  let end2 = null;
  let hasLoop1 = false; // 链表是否有环
  let hasLoop2 = false;

  while(fast1 && fast1.next) {
    slow1 = slow1.next;
    fast1 = fast1.next.next;
    if (slow1 === fast1) {
      hasLoop1 = true;
      break;
    }
  }
  while(fast2 && fast2.next) {
    slow2 = slow2.next;
    fast2 = fast2.next.next;
    if (slow2 === fast2) {
      hasLoop2 = true;
      break;
    }
  }

  // 如果两个链表，一个有环，一个没有，那么不相交
  if (hasLoop1 !== hasLoop2) {
    return null;
  }

  // 如果都没有环
  if (!hasLoop1) {
    while(slow1 && slow1.next) {
      slow1 = slow1.next;
    }
    while(slow2 && slow2.next) {
      slow2 = slow2.next;
    }

    // 如果尾结点不相同，则说明不相交
    if (slow1 !== slow2) {
      return null;
    }
  }
  // 如果都有环
  else {
    fast1 = head1;
    fast2 = head2;
    while(slow1) {
      if (slow1 === fast1) {
        break;
      }
      end1 = slow1;
      slow1 = slow1.next;
      fast1 = fast1.next;
    }

    while(slow2) {
      if (slow2 === fast2) {
        break;
      }
      end2 = slow2;
      slow2 = slow2.next;
      fast2 = fast2.next;
    }
  
    while(fast2 && fast2 !== end1) {
      if (fast2 === end2) {
        // 无相交
        return null;
      }
      fast2 = fast2.next;
    }
  }

  // 有相交

  // 以 end1 为相同末节点计算长度
  slow1 = head1;
  slow2 = head2;
  while(slow1 && slow1 !== end1) {
    len1++;
    slow1 = slow1.next;
  }
  while(slow2 && slow2 !== end1) {
    len2++;
    slow2 = slow2.next;
  }

  slow1 = head1;
  slow2 = head2;
  if (len1 >= len2) {
    while(len1 - len2 > 0) {
      slow1 = slow1.next;
      len1--;
    }
  } else {
    while(len2 - len1 > 0) {
      len2--;
      slow2 = slow2.next;
    }
  }

  while(slow1) {
    if (slow1 === slow2) {
      return slow1;
    }
    slow1 = slow1.next;
    slow2 = slow2.next;
  }
}


let head4 = new LinkedList(0);
head4.append(1);
head4.append(2);
head4.append(3);
head4.append(4);
let node2 = new LinkedList(5);
node2.append(6)
node2.append(7)
node2.append(8)
node2.append(9)
head4.getLast().next = node2;
node2.getLast().next = node2;

let head5 = new LinkedList(10);
head5.append(11);
head5.append(12);
head5.append(13);
head5.append(14);
head5.append(15);
head5.getLast().next = node2.next.next;

head4.print();
head5.print();
console.log('answer0:', getIntersectionNode(head4, head5));
console.log('answer1:', getIntersectionNode1(head4, head5));
console.log('answer3:', getIntersectionNode3(head4, head5));