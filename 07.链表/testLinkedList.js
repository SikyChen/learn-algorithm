const LinkedList = require("./LinkedList");
const DoubleListNode = require("./doubleLinkedList");

console.log('=========================================')
// 测试代码 - 单链表
const head = new LinkedList();
head.print();           // 0

head.append(1);
head.print();           // 0,1

head.append(2);
head.append(3);
head.append(4);
head.append(5);
head.append(6);
head.print();           // 0,1,2,3,4,5,6

head.getLast().print(); // 6

const reverseHead = head.reverse();
reverseHead.print();    // 6,5,4,3,2,1,0

console.log('=========================================')
// 测试代码 - 双链表
let head2 = new DoubleListNode(1); 
head2.print();          // 1

head2.append(2);
head2.print();          // 1,2
head2.getLast().print();// 2

head2.append(3);
head2.append(4);
head2.append(5);
head2.print();          // 1,2,3,4,5
head2.getLast().print();// 5

head2.delete(3);
head2.print();          // 1,2,3,5

const reverseHead2 = DoubleListNode.reverseDoubleListNode(head2);
reverseHead2.print();   // 5,3,2,1

console.log('=========================================')