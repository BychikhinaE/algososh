import React, { useState, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";

const swap = (
  arr: Array<{ item: number; state: ElementStates }>,
  setArray: Dispatch<SetStateAction<TMainArray>>,
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  setArray(arr);
};

type TMainArray = Array<{ item: number; state: ElementStates }>;

const bubbleSort = async (
  array: TMainArray,
  direction: Direction,
  setArray: Dispatch<SetStateAction<TMainArray>>
) => {
  let len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      array[j].state = ElementStates.Changing;
      array[j + 1].state = ElementStates.Changing;
      setArray([...array]);
      await delay(1000);
      if (direction === Direction.Descending) {
        if (array[j].item < array[j + 1].item) {
          swap(array, setArray, j, j + 1);
        }
      } else if (direction === Direction.Ascending) {
        if (array[j].item > array[j + 1].item) {
          swap(array, setArray, j, j + 1);
        }
      }
      array[j].state = ElementStates.Default;
    }
    array[len - i - 1].state = ElementStates.Modified;
    setArray([...array]);
  }
};

const selectionSort = async (
  array: TMainArray,
  direction: Direction,
  setArray: Dispatch<SetStateAction<TMainArray>>
) => {
  let len = array.length;
  for (let i = 0; i < len; i++) {
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
    swap(array, setArray, i, ind);
    array[i].state = ElementStates.Modified;
  }
  array[len - 1].state = ElementStates.Modified;
  setArray([...array]);
};

export const SortingPage: React.FC = () => {
  //массив должен состоять из целых чисел [0; 100]
  //минимальное количество элементов массива minLen = 3, максимальное maxLen = 17.
  const [mainArray, setMainArray] = useState<TMainArray>([]);

  type TFilterState = {
    isDisAllExсeptButtonSort: boolean;
    isLoadButtonAsc?: boolean;
    isLoadButtonDes?: boolean;
  };

  const [filterState, setFilterState] = useState<TFilterState>({
    isDisAllExсeptButtonSort: false,
    isLoadButtonAsc: false,
    isLoadButtonDes: false,
  });

  const randomArr = () => {
    const array = [];
    const length = Math.floor(Math.random() * (18 - 3)) + 3;

    for (let i = 0; i < length; i++) {
      array.push({
        item: Math.round(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return array;
  };

  const [checked, setChecked] = useState<string>("select");

  const sortAscending = async () => {
    if (mainArray.length > 0) {
      setFilterState({
        isDisAllExсeptButtonSort: true,
        isLoadButtonAsc: true,
      });

      if (checked === "bubble") {
        await bubbleSort(mainArray, Direction.Ascending, setMainArray);
      }
      if (checked === "select") {
        await selectionSort(mainArray, Direction.Ascending, setMainArray);
      }

      setFilterState({
        isDisAllExсeptButtonSort: false,
        isLoadButtonAsc: false,
      });
    }
  };

  const sortDescending = async () => {
    if (mainArray.length > 0) {
      setFilterState({
        isDisAllExсeptButtonSort: true,
        isLoadButtonDes: true,
      });

      if (checked === "bubble") {
        await bubbleSort(mainArray, Direction.Descending, setMainArray);
      }
      if (checked === "select") {
        await selectionSort(mainArray, Direction.Descending, setMainArray);
      }
      setFilterState({
        isDisAllExсeptButtonSort: false,
        isLoadButtonDes: false,
      });
    }
  };

  const sortNewArray = () => {
    setMainArray(randomArr());
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.container}>
        <div className={styles.filters}>
          <RadioInput
            label="Выбор"
            name="sorting"
            value="select"
            checked={checked === "select"}
            onChange={() => setChecked("select")}
            disabled={filterState.isDisAllExсeptButtonSort}
          />
          <RadioInput
            label="Пузырёк"
            name="sorting"
            value="bubble"
            checked={checked === "bubble"}
            onChange={() => setChecked("bubble")}
            disabled={filterState.isDisAllExсeptButtonSort}
          />
          <Button
            sorting={Direction.Ascending}
            text="По возрастанию"
            onClick={sortAscending}
            disabled={filterState.isLoadButtonDes}
            isLoader={filterState.isLoadButtonAsc}
          />
          <Button
            sorting={Direction.Descending}
            text="По убыванию"
            onClick={sortDescending}
            disabled={filterState.isLoadButtonAsc}
            isLoader={filterState.isLoadButtonDes}
          />
          {/* если остальной код не очень получается то на верстку можно забить же? */}
          <div> </div>
          <Button
            text="Новый массив"
            onClick={sortNewArray}
            disabled={filterState.isDisAllExсeptButtonSort}
          />
        </div>
        <ul className={styles.list}>
          {mainArray.map((item, index) => (
            <li key={index} className={styles.item}>
              <Column index={item.item} state={item.state} />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
