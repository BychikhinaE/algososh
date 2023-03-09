interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clean: () => void;
  getItems: () => Array<T>;
  isEmpty: () => boolean;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.getSize()) {
      const index = this.getSize() - 1;
      const elem = this.container[index];
      return elem;
    } else {
      return null;
    }
  };

  getSize = () => this.container.length;

  clean = (): void => {
    this.container = [];
  };

  getItems = () => this.container;

  isEmpty = () => this.container.length === 0;
}
