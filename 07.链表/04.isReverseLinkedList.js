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

  p = head;
  while (p && stack.length) {
    if (p.val !== stack.pop().val) {
      return false;
    }
    p = p.next;
  }

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList2(head1));
console.log('head2', isReverseLinkedList2(head2));
console.log('=========================================');


/**
 * 方法三
 * 使用半个栈来存储
 * 利用快慢指针，
 */
function isReverseLinkedList3(head) {
  let stack = [];
  let p1 = head;
  let p2 = head;
  while (p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }

  while (p1) {
    stack.push(p1);
    p1 = p1.next;
  }

  p1 = head;
  while (p1 && stack.length) {
    const temp = stack.pop();
    if (p1.val !== temp.val) {
      return false;
    }
    p1 = p1.next;
  }

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList3(head1));
console.log('head2', isReverseLinkedList3(head2));
console.log('=========================================');


/**
 * 方法四
 * 空间复杂度 O(1) ，也就是不使用栈，只用有限的变量来完成
 * 
 * 1. 使用快慢指针找到中间的节点
 * 2. 节点后面的链表反转
 * 3. 对比两个链表
 * 4. 恢复后面的链表
 * 
 * 1 2 3 4 5 6
 *     p
 *         p
 */
function isReverseLinkedList4(head) {
  let p1 = head;
  let p2 = head;
  let pre = null;
  
  while(p2 && p2.next) {
    p1 = p1.next;
    p2 = p2.next.next;
  }

  while(p1) {
    let next = p1.next;
    p1.next = pre;
    pre = p1;
    p1 = next;
  }

  p1 = head;
  p2 = pre;
  while(p1 && p2) {
    if (p1.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // 恢复链表 当前 head： 0->1->2->3->4<-3<-2<-1<-0 :pre
  p2 = pre;
  pre = null;
  while(p2) {
    let next = p2.next;
    p2.next = pre;
    pre = p2;
    p2 = next
  }
  // 恢复后 head： 0->1->2->3->4->3->2->1->0
  //                        pre=4

  return true;
}

// 测试代码
console.log('head1', isReverseLinkedList4(head1));
console.log('head2', isReverseLinkedList4(head2));
console.log('=========================================');