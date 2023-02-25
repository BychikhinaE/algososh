import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list.module.css";
import { LinkedList } from ".";
import { ElementStates } from "../../types/element-states";

type TElem={
item?: string;
state: ElementStates;
head?: boolean;
tail?: boolean;
}
export const ListPage: React.FC = () => {
  const [element, setElement] = useState<string | undefined>();
  const [inputIndex, setInputIndex] = useState<string | undefined>();
const[arr, setArr] = useState<Array<TElem>>()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };
  const [list] = useState(new LinkedList<string>());

  const addInHead = () => {};
  const addInTail = () => {};
  const deleteFromHead = () => {};
  const deleteFromTail = () => {};

  const addByIndex = () => {
    if(inputIndex && element)
    {list.insertAt(element, Number(inputIndex))}
  };
  const deleteByIndex = () => {};
  

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.form}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            placeholder="Введите значение"
            value={element}
            onChange={onChange}
          />
          <Button
            text="Добавить в head"
            onClick={addInHead}
            isLoader={false}
            disabled={false}
          />
          <Button
            text="Добавить в tail"
            onClick={addInTail}
            isLoader={false}
            disabled={false}
          />
          <Button
            text="Удалить из head"
            onClick={deleteFromHead}
            isLoader={false}
            disabled={false}
          />
          <Button
            text="Удалить из tail"
            onClick={deleteFromTail}
            isLoader={false}
            disabled={false}
          />
        </div>
        <div className={styles.formIndex}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndex}
            onChange={onChangeIndex}
          />
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            isLoader={false}
            disabled={element && inputIndex ? false : true}
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteByIndex}
            isLoader={false}
            disabled={false}
          />
        </div>
        <ul className={styles.list}>
          {arr &&
            arr.map(({item, state, head, tail}, index) => (
              <li key={index}>
                <Circle 
                letter={item} 
                state={state}
                />
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
