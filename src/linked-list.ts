interface Person {
  name: string;
  age: number;
}

export class Node<U> {
  private next: Node<U> | null = null;

  constructor(private readonly data: U) {}

  getData() {
    return this.data;
  }

  getNext() {
    return this.next;
  }

  setNext(next: Node<U> | null) {
    this.next = next;
  }
}

export class LinkedList<T> {
  private head: Node<T> | null = null;
  private count = 0;

  insert(data: T) {
    if (!this.head) {
      this.head = new Node(data);
      this.count++;
      return;
    }

    const node = new Node(data);
    node.setNext(this.head);
    this.head = node;
    this.count++;
  }

  insertBefore(data: T, predicate: T) {
    if (this.count == 0) throw new Error("List is empty.");
    let current = this.head!;

    for (let i = 0; i < this.count; i++) {
      if (JSON.stringify(current.getData()) == JSON.stringify(predicate)) {
        const newNode = new Node(data);
        newNode.setNext(current.getNext());
        current.setNext(newNode);
        this.count++;
        return;
      }

      current = current.getNext()!;
    }

    throw new Error("Predicate not found.");
  }

  includes(predicate: T) {
    if (this.count == 0) throw new Error("List is empty.");
    let current = this.head!;

    for (let i = 0; i < this.count; i++) {
      if (JSON.stringify(current.getData()) == JSON.stringify(predicate)) return true;
      current = current.getNext()!;
    }

    return false;
  }

  traverse(callback: (current: Node<T>, index: number) => void) {
    if (this.count == 0) throw new Error("List is empty.");
    let current = this.head!;

    for (let i = 0; i < this.count; i++) {
      callback(current, i);
      current = current.getNext()!;
    }
  }

  peek() {
    return { ...this.head };
  }

  deleteTail() {
    if (this.count == 0) throw new Error("List is empty.");
    let current = this.head!;

    do {
      if (!current.getNext()?.getNext()) {
        current.setNext(null);
        this.count--;
      }
      current = current.getNext()!;
    } while (current);
  }

  deleteHead() {
    if (!this.head) return;
    this.head = this.head.getNext();
    this.count--;
  }

  length() {
    return this.count;
  }
}

const myList = new LinkedList<Person>();
myList.insert({ name: "Adam", age: 21 });
myList.insert({ name: "Mary", age: 33 });
myList.insert({ name: "Kin", age: 19 });
myList.insertBefore({ name: "Edwin", age: 221 }, { name: "Kin", age: 19 });
myList.traverse((n, i) => console.log(n.getData()));
