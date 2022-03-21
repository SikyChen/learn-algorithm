/**
 * 判断一个链表，是否是回文结构
 */

const LinkedList = require('./LinkedList');
const head1 = new LinkedList(1);
const head2 = new LinkedList(0);
[2, 3, 4, 5, 6].forEach(item => {
  head1.append(item);
});
[1, 2, 3, 4, 3, 2, 1, 0].forEach(item => {
  head2.append(item);
});
head1.print();
head2.print();
console.log('=========================================')

/**
 * 方法一：
 * 将链表值放入数组中，判断数组reverse后是否跟原数组相同
 */
function isReverseLinkedList(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList(head1));
console.log('head2', isReverseLinkedList(head2));
console.log('=========================================');


/**
 * 方法二
 * 使用一个栈来存储所有节点，出栈时跟原链表各个节点比较，如果不相同则说明不是回文链表
 */
function isReverseLinkedList2(head) {
  let stack = [];
  let p = head;
  while (p) {
    stack.push(p);
    p = p.next;
  }

  while (head) {
    if (head !== stack.pop()) {
      return false;
    }
  }

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList(head1));
console.log('head2', isReverseLinkedList(head2));
console.log('=========================================');


/**
 * 方法三
 * 使用半个栈来存储
 * 利用快慢指针，
 */
function isReverseLinkedList2(head) {
  let stack = [];
  let p1 = head;
  let p2 = head;
  while (p2 || p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }

  while (p1) {
    stack.push(p1);
    p1 = p1.next;
  }

  while (head && stack.length) {
    if (head !== stack.pop()) {
      return false;
    }
  }

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList(head1));
console.log('head2', isReverseLinkedList(head2));
console.log('=========================================');
