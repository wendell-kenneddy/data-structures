import { LinkedList } from "./linked-list";

// TODO: add validations and use doubly-linked-lists
export class Queue<T> {
  private readonly list: LinkedList<T> = new LinkedList<T>();

  constructor(private readonly _limit: number) {}

  enqueue(item: T): void {
    if (this.list.length == this._limit) throw new Error("Maxinum number of items queued.");
    if (this.list.length == 0) return this.list.insert(item);
    this.list.insertBefore(item, this.list.tail?.data!);
  }

  dequeue(): T {
    const item = this.list.head?.data!;
    this.list.deleteHead();
    return item;
  }

  clear(): void {
    this.list.clear();
  }

  peek(): T {
    const item = this.list.head?.data!;
    return item;
  }

  get length(): number {
    return this.list.length;
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
