interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
  }
  
  export class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      if(this.getSize()){
       this.container.pop()
      }
    };
  
    peak = (): T | null => {
         if(this.getSize()){
           const index = this.getSize()-1
       const elem =  this.container[index]
        return elem
      } else { return null;}
     
    };
  
    getSize = () => this.container.length;

    clean = (): void => {
        this.container = []
    }

    getItems=()=> this.container
  }
  