interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getItems: () => Array<T | null>;
  clean: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    } else {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      this.container[this.head % this.size] = null;
      this.head++;
      this.length--;
    }
  };

  isEmpty = () => this.length === 0;

  getItems = () => [...this.container];

  clean = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = [];
  };

  getIndexHead = () => {
    return this.head;
  };

  getIndexTail = () => {
    return this.tail;
  };
}
