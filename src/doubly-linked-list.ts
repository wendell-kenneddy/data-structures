import { areEquivalent } from "./utils/comparison";

class Node<U> {
  #next: Node<U> | null = null;
  #prev: Node<U> | null = null;
  #data: U;

  constructor(data: U) {
    this.#data = data;
  }

  get data(): U {
    return this.#data;
  }

  get next(): Node<U> | null {
    return this.#next;
  }

  set next(node: Node<U> | null) {
    this.#next = node;
  }

  get prev(): Node<U> | null {
    return this.#prev;
  }

  set prev(node: Node<U> | null) {
    this.#prev = node;
  }
}

export class DoublyLinkedList<T> {
  #head: Node<T> | null = null;
  #tail: Node<T> | null = null;
  #length: number = 0;

  get head(): Node<T> | null {
    return this.#head;
  }

  get tail(): Node<T> | null {
    return this.#tail;
  }

  get length(): number {
    return this.#length;
  }

  insertAtHead(data: T): void {
    const newNode = new Node(data);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#length++;
      return;
    }

    newNode.prev = this.#head;
    this.#head.next = newNode;
    this.#head = newNode;
    this.#length++;
  }

  insertAtTail(data: T): void {
    const newNode = new Node(data);
    if (!this.#tail) {
      this.#head = newNode;
      this.#tail = newNode;
      this.#length++;
      return;
    }

    newNode.next = this.#tail;
    this.#tail.prev = newNode;
    this.#tail = newNode;
    this.#length++;
  }

  insertBefore(predicate: T, data: T): void {
    const target = this.search(predicate);
    if (target) {
      const newNode = new Node(data);
      newNode.next = target;
      target.prev = newNode;

      if (target.data == this.#tail?.data) this.#tail = newNode;
      this.#length++;
    }
  }

  deleteHead(): void {
    if (!this.#head) return;
    if (this.#length == 1) {
      this.#head = null;
      this.#tail = null;
      this.#length--;
    }
    const newHead = this.#head?.prev!;
    newHead.next = null;
    this.#head = newHead;
    this.#length--;
  }

  deleteTail(): void {
    if (!this.tail) return;
    if (this.#length == 1) {
      this.#head = null;
      this.#tail = null;
      this.#length--;
    }
    const newTail = this.#tail?.next!;
    newTail.prev = null;
    this.#tail = newTail;
    this.#length--;
  }

  deleteNode(predicate: T): void {
    const node = this.search(predicate);
    if (node) {
      if (node.data == this.#head?.data) return this.deleteHead();
      if (node.data == this.#tail?.data) return this.deleteTail();
      const nextNode = node.next!;
      const prevNode = node.prev!;
      nextNode.prev = prevNode;
      prevNode.next = nextNode;
    }
  }

  search(predicate: T): Node<T> | null {
    if (!this.#length) return null;
    if (this.#length == 1 && areEquivalent(this.#head?.data, predicate)) return this.#head;
    if (this.#length == 2)
      return areEquivalent(this.#head?.data, predicate)
        ? this.#head
        : areEquivalent(this.#tail?.data, predicate)
        ? this.#tail
        : null;

    let currentHead = this.#head;
    let currentTail = this.#tail;
    let checks = 0;

    while (checks < Math.ceil(this.#length / 2)) {
      const target = areEquivalent(currentHead?.data, predicate)
        ? currentHead
        : areEquivalent(currentTail?.data, predicate)
        ? currentTail
        : null;
      if (target) return target;
      currentHead = currentHead?.prev!;
      currentTail = currentTail?.next!;
      checks++;
    }

    return null;
  }

  traverse(reverse: boolean, callback: (node: Node<T>) => void): void {
    if (!this.#length) return;
    let current: Node<T> | null = (reverse ? this.#tail : this.#head)!;
    while (current) {
      callback(current);
      current = reverse ? current.next : current.prev;
    }
  }

  clear(): void {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }
}

// const dll = new DoublyLinkedList<string>();
// dll.insertAtHead("adam");
// dll.insertAtHead("gerald");
// dll.insertAtHead("jimmy");
// dll.clear();
// dll.traverse(false, (n) => console.log(n.data));
