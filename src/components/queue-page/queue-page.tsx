import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  //кнопкa «Добавить», по клику на неё должен вызываться метод очереди enqueue(item)
  const onClickAdd = () => {};
  //кнопкa «Удалить», по клику на неё должен вызываться метод очереди dequeue();
  const onClickDelete = () => {};
  const onClickClean = () => {};
  const arr: Array<string> = [];

  return (
    <SolutionLayout title="Очередь">
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
        <Button
          text="Очистить"
          onClick={onClickClean}
          disabled={false}
          isLoader={false}
        />
      </form>
      <ul>
        {arr.length > 0 &&
          arr.map((item, index) => (
            <li key={index}>
              <Circle letter={item} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
