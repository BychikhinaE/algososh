import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from ".";
import { ElementStates } from "../../types/element-states";

type TElemArray = {item?: string, state: ElementStates} 

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const [mainArray, setMainArray] = useState<Array<TElemArray | null>>(Array.from({ length: 7 }, () => ({ item: '', state: ElementStates.Default })));
  //const queue = new Queue<TElemArray>(7);
  const [queue] = useState(new Queue<TElemArray>(7))
  console.log(queue)

  //кнопкa «Добавить», по клику на неё должен вызываться метод очереди enqueue(item)
  const onClickAdd = async() => {
    // queue.enqueue({item: input, state: ElementStates.Default});
   // setMainArray(queue.getItems())
    setInput('')
  };


  //кнопкa «Удалить», по клику на неё должен вызываться метод очереди dequeue();
  const onClickDelete = () => {

  };

  const onClickClean = () => {
    // queue.clean()
    // setMainArray([...queue.getItems()])
  };
  

  return (
    <SolutionLayout title="Очередь">
      <article className={styles.container}>
      <form className={styles.form}>
        <Input
          type="text"
          isLimitText={true}
          maxLength={4}
          value={input}
          onChange={onChange}
        />
        <Button
          text="Добавить"
          onClick={onClickAdd}
          disabled={false}
          isLoader={false}
        />
        <Button
          text="Удалить"
          onClick={onClickDelete}
          disabled={false}
          isLoader={false}
        />
        {/* всё еще стыдно.. */}
        <div> </div>
        <Button
          text="Очистить"
          onClick={onClickClean}
          disabled={false}
          isLoader={false}
        />
      </form>
      <ul className={styles.list}>
        {mainArray &&
          mainArray.slice(0, 7).map((item, index) => (
            <li key={index}>
              <Circle 
              letter={item?.item} 
              index={index}
              head={'head'}
              tail={'tail'}
              state={item?.state}
              />
            </li>
          ))}
      </ul>
      </article>
      
    </SolutionLayout>
  );
};
