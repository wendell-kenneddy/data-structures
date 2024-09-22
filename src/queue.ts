import { DoublyLinkedList } from "./doubly-linked-list";

export class Queue<T> {
  readonly #list: DoublyLinkedList<T> = new DoublyLinkedList<T>();
  #limit: number;

  constructor(limit: number) {
    this.#limit = limit;
  }

  get limit(): number {
    return this.#limit;
  }

  get length(): number {
    return this.#list.length;
  }

  enqueue(item: T): void {
    if (this.#list.length == this.#limit) throw new Error("Maxinum number of items queued.");
    this.#list.insertAtTail(item);
  }

  dequeue(): T | null {
    if (this.#list.length) {
      const item = this.#list.head?.data!;
      this.#list.deleteHead();
      return item;
    }

    return null;
  }

  clear(): void {
    this.#list.clear();
  }

  peek(): T | null {
    const item = this.#list.head?.data;
    return item || null;
  }
}

// const myQueue = new Queue<number>(5);
// myQueue.enqueue(1);
// myQueue.enqueue(2);
// myQueue.enqueue(3);
// myQueue.enqueue(4);
// myQueue.enqueue(5);
// myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();
// myQueue.dequeue();
// console.log(myQueue.peek());
