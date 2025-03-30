export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;

  append(value: T) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
      return;
    }
  }

  print() {
    let current = this.head;

    while (current) {
      // console.log(current.value);
      current = current.next;
    }
  }
}
