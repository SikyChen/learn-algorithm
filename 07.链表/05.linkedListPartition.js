/**
 * 链表的partition
 * 给定一个链表如 head = [1,8,3,5,6,8,4,2,7,9,4,5,2,4]
 * 给定一个 p = 5
 * 使链表中小于 5 的值在左边，等于 5 的值在中间，大于 5 的值在右边，具有稳定性，相同种类的值顺序不变，即 1 和 3 的相对位置不变，7 和 9 的相对位置也不变
 * 结果为 [1,3,4,2,4,2,4,5,5,8,6,8,7,9]
 */

const LinkedList = require("./LinkedList");
let head = new LinkedList(0);
[1,8,3,5,6,8,4,2,7,9,4,5,2,4].forEach(item => {
  head.append(item);
});
head = head.next;
head.print();
console.log('=========================================')

/**
 * 方法一：
 * 新建一个变量 temp ，用于存放右侧链表
 * 遍历 head 将大于 p 的节点放入 temp 中
 * 遍历完成后将两个链表连接在一起
 */
function linkedListPartition(head, p) {
  let lh = null;
  let lt = null;
  let mh = null;
  let mt = null;
  let rh = null;
  let rt = null;

  while(head) {
    if (head.val < p) {
      if (!lh) {
        lh = head;
        lt = head;
      } else {
        lt.next = head;
        lt = lt.next;
      }
    }
    else if (head.val === p) {
      if (!mh) {
        mh = head;
        mt = head;
      } else {
        mt.next = head;
        mt = mt.next;
      }
    }
    else {
      if (!rh) {
        rh = head;
        rt = head;
      } else {
        rt.next = head;
        rt = rt.next;
      }
    }
    head = head.next;
  }
  
  lt.next = mh;
  mt.next = rh;
  rt.next = null;

  console.log(lh);
}

linkedListPartition(head, 5);
head.print();
