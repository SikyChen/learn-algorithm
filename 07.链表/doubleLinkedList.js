/**
 * 链表
 * 有 单向链表 和 双向链表
 * 
 * 链表可以：
 * 1. 向尾部添加节点
 * 2. 取出尾部节点
 * 3. 删除某一节点
 * 4. 打印所有节点
 * ...
 */

/**
 * 双向链表
 * 的数据结构
 */
function DoubleListNode(val, next, pre) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
  this.pre = (next === undefined ? null : pre)
}

// 获取链表实例的最后一个节点
DoubleListNode.prototype.getLast = function () {
  let head = this;
  while (head && head.next) {
    let next = head.next;
    head = next;
  }
  return head;
}

// 添加新节点到尾部
DoubleListNode.prototype.append = function (val) {
  const node = new DoubleListNode(val);
  const last = this.getLast();
  last.next = node;
  node.pre = last;
}

// 删除从head开始的第 count 个节点
DoubleListNode.prototype.delete = function (count) {
  let countTemp = 0;
  let head = this;
  let prev = null;
  while (head) {
    if (countTemp === count) {
      prev.next = head.next;
      head.next.pre = prev;
      return;
    }
    prev = head;
    head = head.next;
    countTemp++;
  }
  console.log('count超出了');
  return -1;
}

// 打印所有节点
DoubleListNode.prototype.print = function () {
  let res = [];
  let head = this;
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  console.log(res.join(','));
}

/**
 * 反转双链表
 */
DoubleListNode.reverseDoubleListNode = function reverseDoubleListNode(head) {
  let next = null;
  let prev = null;
  while(head) {
    let next = head.next;
    head.pre = next;
    head.next = prev;
    prev = head;
    head = next;
  }
  head = prev;

  return head;
}

module.exports = DoubleListNode;
