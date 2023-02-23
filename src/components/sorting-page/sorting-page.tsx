import React, { useState, Dispatch, SetStateAction,  } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting.module.css";
import { Direction } from '../../types/direction';
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";

const bubbleSort = async (array: Array<{item: number, state: ElementStates}>, direction: Direction, setArray: Dispatch<SetStateAction<{item: number, state: ElementStates}>>) => {
let len = array.length
  if (len > 1) {
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await delay(1000);
        if (direction === Direction.Descending) {
          if (array[j].item < array[j + 1].item) {
            [array[j].item, array[j + 1].item] = [array[j + 1].item, array[j].item];
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].item > array[j + 1].item) {
            [array[j].item, array[j + 1].item] = [array[j + 1].item, array[j].item];
          }
        }
        array[j].state = ElementStates.Default;
      }
      array[len - i - 1].state = ElementStates.Modified;
    }
  }
}

const selectionSort = async (array: Array<{item: number, state: ElementStates}>, direction: Direction, setArray: Dispatch<SetStateAction<{item: number, state: ElementStates}>>) => {
  let len = array.length
  if (len > 1) {
    for (let i = 0; i < len - 1; i++) {
      let ind = i;
      for (let j = i + 1; j < len; j++) {
        array[i].state = ElementStates.Changing;
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delay(1000);
        if (direction === Direction.Descending) {
          if (array[j].item > array[ind].item) {
            ind = j;
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].item < array[ind].item) {
            ind = j;
          }
        }
        array[j].state = ElementStates.Default;
        setArray([...array]);
      }
      [array[i].item, array[ind].item] = [array[ind].item, array[i].item];
      array[i].state = ElementStates.Modified;
    }
    array[array.length - 1].state = ElementStates.Modified;
  }
}

export const SortingPage: React.FC = () => {
  //массив должен состоять из целых чисел [0; 100]
  //минимальное количество элементов массива minLen = 3, максимальное maxLen = 17.
  //Максимальное значение элемента массива равно 100, это же значение является процентным соотношением высоты столбца.
  //В качестве максимальной высоты считайте 340px.
  // высоты элементов массива
  // `${(340 * arr[i]) / 100}px`
  const [mainArray, setMainArray] =
   useState<Array<{item: number, state: ElementStates}>>();

  const randomArr = () => {
    const array = [];
    const length =  Math.floor(Math.random() * (18 - 3)) + 3

    for (let i = 0; i < length; i++) {
        array.push({ item: Math.round(Math.random() * 100), state: ElementStates.Default });
    }
    return array;
  };

  const [checked, setChecked] = useState<string>("select");

  const sortAscending = () => {
    if (checked === 'bubble') {
      bubbleSort(mainArray, Direction.Ascending,  setMainArray);
    }
    if (checked === 'select') {
      selectionSort(mainArray, Direction.Ascending, setMainArray);
    }
  };


  const sortDescending = () => {
    if (checked === 'bubble') {
      bubbleSort(mainArray, Direction.Descending,  setMainArray);
    }
    if (checked === 'select') {
      selectionSort(mainArray, Direction.Descending, setMainArray);
    }
  };

  const sortNewArray = () => {
    setMainArray(randomArr());
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.filters}>
        <RadioInput
          label="Выбор"
          name="sorting"
          value="select"
          checked={checked === "select"}
          onChange={()=>setChecked("select")}
          disabled={false}
        />
        <RadioInput
          label="Пузырёк"
          name="sorting"
          value="bubble"
          checked={checked === "bubble"}
          onChange={()=>setChecked("bubble")}
          disabled={false}
        />
        <Button
          sorting={Direction.Ascending}
          text="По возрастанию"
          onClick={sortAscending}
          disabled={false}
          isLoader={false}
        />
        <Button
          sorting={Direction.Descending}
          text="По убыванию"
          onClick={sortDescending}
          disabled={false}
          isLoader={false}
        />
        <Button
          text="Новый массив"
          onClick={sortNewArray}
          disabled={false}
          isLoader={false}
        />
      </div>
      <ul className={styles.list}>
        {mainArray.map((item, index) =>
            <li key={index} className={styles.item}>
              <Column index={item.item} state={item.state} />
            </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
