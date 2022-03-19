/**
 * 打印两个有序单链表的公共部分
 */

const LinkedList = require("./LinkedList");

// 构造两个有序链表
const head1 = new LinkedList(1);
const head2 = new LinkedList(0);
[2,3,4,5,6].forEach(item => {
  head1.append(item);
});
[2,4,6,7,9].forEach(item => {
  head2.append(item);
});
head1.print();
head2.print();
console.log('=========================================')

/**
 * 打印两个有序单链表的公共部分 - 1 
 * 
 * 将一个链表的所有节点值，都存到数组中，另一个链表遍历，检查其 val 是否在临时数组中，若某个节点在数组中，则是第一个相交节点
 */
function printCommonPart1(h1, h2) {
  let temp = [];
  while(h1) {
    temp.push(h1.val);
    h1 = h1.next;
  }
  while(h2) {
    if (temp.includes(h2.val)) {
      console.log(h2.val);
    }
    h2 = h2.next;
  }
}
printCommonPart1(head1, head2);
console.log('=========================================')

/**
 * 打印两个有序单链表的公共部分 - 2
 * 
 * 两个指针分别在两个链表上
 * 1. 哪个指针的数字小，那个指针走到下一步，
 * 2. 如果相同则打印，并且让 h1 的指针走一步
 * 3. 当一个指针走出链表后停止
 */
function printCommonPart2(h1, h2) {
  while(h1 && h2) {
    if (h1.val < h2.val) {
      h1 = h1.next;
    }
    else if (h1.val > h2.val) {
      h2 = h2.next;
    }
    else {
      console.log(h1.val);
      h1 = h1.next;
    }
  }
}
printCommonPart2(head1, head2)
console.log('=========================================')