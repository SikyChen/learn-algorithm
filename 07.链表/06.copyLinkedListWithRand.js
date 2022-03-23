/**
 * 复制链表 
 * 复制后的链表与原链表的节点，应该不能重复
 * 链表中的每个节点，出next外，还有rand指向任意链表或者null
 */

const LinkedList = require("./LinkedList");
class LinkedListWithPrint2 extends LinkedList {
  print2() {
    let res = [];
    let head = this;
    while(head) {
      res.push(`${head.val}(${head.rand ? head.rand.val : 'null'})`);
      head = head.next;
    }
    console.log(res.join(','));
  }
}
let head = new LinkedListWithPrint2(0);
[1, 2, 3, 4, 5].forEach(item => {
  head.append(item);
});
let temp = head;
let arr = [null];
while (temp) {
  arr.push(temp);
  temp = temp.next;
}
temp = head;
while(temp) {
  temp.rand = arr[Math.floor(Math.random() * (arr.length))];
  temp = temp.next;
}

console.log('原链表')
head.print();
head.print2();

// temp = head;
// while(temp) {
//   console.log(temp);
//   temp = temp.next;
// }

console.log('=========================================');


/**
 * 方法一
 * 使用map存储，key 为 val， value 为 node
 */
function copyLinkedListWithRand(head) {
  let res = new LinkedListWithPrint2();
  let pointer = res;
  let map = {};
  let temp = head;
  while(temp) {
    pointer.next = new LinkedListWithPrint2(temp.val);
    map[temp.val] = pointer.next;
    temp = temp.next;
    pointer = pointer.next;
  }

  pointer = res.next;
  temp = head;
  while(pointer) {
    pointer.rand = temp.rand ? map[temp.rand.val] : null;
    pointer = pointer.next;
    temp = temp.next;
  }

  return res.next;
}

const copyedHead = copyLinkedListWithRand(head);

console.log('Answer')
copyedHead.print();
copyedHead.print2();
console.log('=========================================');


/**
 * 方法一（）优化
 */
function copyLinkedListWithRand1(head) {
  let map = new Map();
  let cur = head;
  while(cur) {
    map.set(cur, new LinkedListWithPrint2(cur.val));
    cur = cur.next;
  }

  cur = head;
  while(cur) {
    map.get(cur).next = map.get(cur.next);
    map.get(cur).rand = map.get(cur.rand);
    cur = cur.next;
  }

  return map.get(head);
}

const copyedHead1 = copyLinkedListWithRand1(head);

console.log('Answer 1')
copyedHead1.print();
copyedHead1.print2();
console.log('=========================================');


/**
 * 方法二
 * 不使用额外的 map
 * 若链表 1,2,3 复制后是 1',2',3'
 * 每复制一个节点，都将节点放入原链表中，则可在原链表上继续操作
 * 1,1',2,2',3,3'
 * 设置rand的时候，比如1的rand指向2，那么1'的rand指向2'
 */
function copyLinkedListWithRand2(head) {
  let res = null;

  let cur = head;
  while(cur) {
    let copyCur = new LinkedListWithPrint2(cur.val);
    let next = cur.next;
    cur.next = copyCur;
    copyCur.next = next;

    cur = next;
  }

  res = head.next;

  cur = head;
  while(cur) {
    let copyCur = cur.next;
    copyCur.rand = cur.rand ? cur.rand.next : null;
    cur = copyCur.next;
  }

  cur = head;
  while(cur) {
    let next = cur.next;
    cur.next = next ? next.next : null;
    cur = next;
  }

  return res;
}

const copyedHead2 = copyLinkedListWithRand2(head);

console.log('Answer 2')
copyedHead2.print();
copyedHead2.print2();
console.log('=========================================');
