import { areEquivalent } from "./utils/comparison";

interface Person {
  name: string;
  age: number;
}

export class Node<U> {
  private _next: Node<U> | null = null;

  constructor(private readonly _data: U) {}

  get data(): U {
    return this._data;
  }

  get next(): Node<U> | null {
    return this._next;
  }

  set next(next: Node<U> | null) {
    this._next = next;
  }
}

export class LinkedList<T> {
  private _head: Node<T> | null = null;
  private _length: number = 0;

  insert(data: T): void {
    if (!this._head) {
      this._head = new Node(data);
      this._length++;
      return;
    }

    const newNode = new Node(data);
    newNode.next = this._head;
    this._head = newNode;
    this._length++;
  }

  insertBefore(data: T, predicate: T): void {
    let current: Node<T> | null = this._head;

    while (current) {
      if (areEquivalent(current.data, predicate)) {
        const newNode = new Node(data);
        newNode.next = current.next;
        current.next = newNode;
        this._length++;
        return;
      }

      current = current.next;
    }

    throw new Error("Predicate not found.");
  }

  includes(predicate: T): boolean {
    let current: Node<T> | null = this._head;

    while (current) {
      if (areEquivalent(current.data, predicate)) return true;
      current = current.next;
    }

    return false;
  }

  traverse(callback: (current: Node<T>) => void): void {
    let current: Node<T> | null = this._head;

    while (current) {
      callback(current);
      current = current.next;
    }
  }

  deleteTail(): void {
    if (this._length == 1) return this.deleteHead();
    let current: Node<T> | null = this._head;

    while (current) {
      if (!current.next?.next) {
        current.next = null;
        this._length--;
      }
      current = current.next;
    }
  }

  deleteHead(): void {
    if (this._head) {
      this._head = this._head.next;
      this._length--;
    }
  }

  clear(): void {
    this._head = null;
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  get tail(): Node<T> | null {
    if (this._length == 1) return this._head;
    let current = this._head;

    for (let i = 0; i < this._length; i++) {
      if (i == this._length - 1) return current;
      current = current!.next;
    }

    return current;
  }

  get head(): Node<T> | null {
    return this._head;
  }
}

// const myList = new LinkedList<Person>();
// myList.insert({ name: "Adam", age: 21 });
// myList.insert({ name: "Mary", age: 33 });
// myList.insert({ name: "Kin", age: 19 });
// myList.insertBefore({ name: "Jhonny", age: 22 }, { name: "Kin", age: 19 });
// console.log(myList.length, myList.head);
// myList.traverse((n) => console.log(n.data));
// console.log(myList.tail?.data);
