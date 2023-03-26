import { delay } from "../string/string";
import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

export type TMainArray = Array<{ item: number; state: ElementStates }>;

const swap = (
  arr: Array<{ item: number; state: ElementStates }>,
  firstIndex: number,
  secondIndex: number,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  setArray && setArray(arr);
};

export const bubbleSort = async (
  array: TMainArray,
  direction: Direction,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  let len = array.length;
  if (len === 0) {
    return [];
  }

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      array[j].state = ElementStates.Changing;
      array[j + 1].state = ElementStates.Changing;

      if (setArray) {
        setArray([...array]);
        await delay(1000);
      }

      if (direction === Direction.Descending) {
        if (array[j].item < array[j + 1].item) {
          if (setArray) {
            swap(array, j, j + 1, setArray);
          } else {
            swap(array, j, j + 1);
          }
        }
      } else if (direction === Direction.Ascending) {
        if (array[j].item > array[j + 1].item) {
          if (setArray) {
            swap(array, j, j + 1, setArray);
          } else {
            swap(array, j, j + 1);
          }
        }
      }
      array[j].state = ElementStates.Default;
    }
    array[len - i - 1].state = ElementStates.Modified;
    setArray && setArray([...array]);
  }
  return array;
};

export const selectionSort = async (
  array: TMainArray,
  direction: Direction,
  setArray?: Dispatch<SetStateAction<TMainArray>>
) => {
  let len = array.length;
  if (len === 0) {
    return [];
  }

  for (let i = 0; i < len; i++) {
    let ind = i;
    for (let j = i + 1; j < len; j++) {
      array[i].state = ElementStates.Changing;
      array[j].state = ElementStates.Changing;

      if (setArray) {
        setArray([...array]);
        await delay(1000);
      }

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
      setArray && setArray([...array]);
    }

    if (setArray) {
      swap(array, i, ind, setArray);
    } else {
      swap(array, i, ind);
    }
    array[i].state = ElementStates.Modified;
  }

  array[len - 1].state = ElementStates.Modified;

  setArray && setArray([...array]);

  return array;
};
