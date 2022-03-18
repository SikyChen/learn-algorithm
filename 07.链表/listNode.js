/**
 * 链表
 * 有 单向链表 和 双向链表
 * 
 * 从数据结构角度讲
 * 链表可以：
 * 1. 向头部添加节点
 * 2. 向尾部添加节点
 * 3. 取出头部节点
 * 4. 取出尾部节点
 * 5. 删除某一节点
 * ...
 */

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

let head = null;
[1,2,3,4,5].reverse().forEach(item => {
  head = new ListNode(item, head);
});

/**
ListNode {
  val: 1,
  next: ListNode { val: 2, next: ListNode { val: 3, next: [ListNode] } }
}
 */

// 打印上面这个链表的每一个节点
function printListNodes(head) {
  while (head) {
    console.log('val', head.val);
    head = head.next;
  }
}

printListNodes(head);