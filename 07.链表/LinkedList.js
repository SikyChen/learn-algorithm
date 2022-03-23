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
 * 单向链表
 * 的数据结构
 */
module.exports = class LinkedList {
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }

  append(val) {
    this.getLast().next = new LinkedList(val);
  }

  getLast() {
    let head = this;
    while(head && head.next) {
      head = head.next;
    }
    return head;
  }

  delete(count) {
    let head = this;
    let pre = null;
    let countTemp = 0;
    while(head) {

      if (countTemp = count) {
        pre.next = next;
        next.pre = pre;
        return head;
      }
      
      let next = head.next;
      pre = head;
      head = next;
      countTemp++;
    }

    console.log('count超出了');
    return -1;
  }

  print() {
    let res = [];
    let temp = [];
    let head = this;
    while(head) {
      if (temp.includes(head)) {
        res.push(`(${head.val})`);
        break;
      }
      temp.push(head);
      res.push(head.val);
      head = head.next;
    }
    console.log(res.join(','));
  }

  /**
   * 反转单链表
   */
  reverse() {
    let head = this;
    let prev = null;
    while(head) {
      let next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    
    return prev;
  }
}
