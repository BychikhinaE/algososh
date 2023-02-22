import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const StringComponent: React.FC = () => {
  //массив в который запишем строку по отдельным буквам-элементам и их состоянием
  let arr: Array<{ item: string; state: ElementStates }> = [];
  //Сюда записывается ввод от пользователя
  const [input, setInput] = useState<string>("");
  const [mainArray, setMainArray] = useState<typeof arr>();
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const swap = (
    arr: Array<{ item: string; state: ElementStates }>,
    firstIndex: number,
    secondIndex: number
  ) => {
    console.log("swap", firstIndex, secondIndex);

    const temp = {
      item: arr[firstIndex].item,
      state: ElementStates.Modified,
    };
    arr[firstIndex] = {
      item: arr[secondIndex].item,
      state: ElementStates.Modified,
    };
    arr[secondIndex] = temp;
    //отправляем переставленный массив на отрисовку
    setMainArray(arr);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput("");

    //массив букв из введенной строки без состояния
    const letters: Array<string> = input.split("");

    console.log("letters", letters);

    //все синие
    letters.forEach((item) =>
      arr.push({ item: item, state: ElementStates.Default })
    );

    let len = arr.length;
    let left = 0;
    let rigth = len - 1;

    setMainArray(arr);

    while (left <= rigth) {
      for (let i = 0; i < len; i++) {
        if (i === left || i === rigth) {
          arr[i].state = ElementStates.Changing;
        }
        console.log(arr, "cicl");
        //отправляем покрашенный массив на отрисовку
        setMainArray([...arr]);
      }
      await delay(1000);

      //меняем местами и в свопе перекрашиваем
      swap(arr, left, rigth);

      left++;
      rigth--;
    }

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <article className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={input || ''}
            onChange={onChange}
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={isLoading}
            disabled={input.length < 2}
          />
        </form>
        {mainArray && (
          <ul className={styles.list}>
            {mainArray?.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle letter={item.item} state={item.state} />
              </li>
            ))}
          </ul>
        )}
      </article>
    </SolutionLayout>
  );
};
