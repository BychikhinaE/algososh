import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list.module.css";

export const ListPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addInHead = () => {};
  const addInTail = () => {};
  const deleteFromHead = () => {};
  const deleteFromTail = () => {};
  const addByIndex = () => {};
  const deleteByIndex = () => {};
  const arr: Array<string> = [];

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <Input
        type='text'
        isLimitText={true}
        maxLength={4}
        placeholder='Введите значение'
        value={input}
        onChange={onChange}
        />
        <Button 
        text='Добавить в head'
        onClick={addInHead}
        isLoader={false}
        disabled={false}
        />
                <Button 
        text='Добавить в tail'
        onClick={addInTail}
        isLoader={false}
        disabled={false}
        />
                        <Button 
        text='Удалить из head'
        onClick={deleteFromHead}
        isLoader={false}
        disabled={false}
        />
                              <Button 
        text='Удалить из tail'
        onClick={deleteFromTail}
        isLoader={false}
        disabled={false}
        />
      </form>
      <form className={styles.formIndex}>
      <Input
        type='number'
        placeholder='Введите индекс'
        value={input}
        onChange={onChange}
        />
       <Button 
        text='Добавить по индексу'
        onClick={addByIndex}
        isLoader={false}
        disabled={false}
        />
               <Button 
        text='Удалить по индексу'
        onClick={deleteByIndex}
        isLoader={false}
        disabled={false}
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
