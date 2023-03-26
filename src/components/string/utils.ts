import React, { SetStateAction, Dispatch } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "./string";

type TSetMainArray = Dispatch<
  SetStateAction<{ item: string; state: ElementStates }[]>
>;

const swap = (
  arr: Array<{ item: string; state: ElementStates }>,
  firstIndex: number,
  secondIndex: number,
  setMainArray?: TSetMainArray
) => {
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
  setMainArray && setMainArray(arr);
};

export const onSubmitReverse = async (
  input: string,
  setMainArray?: TSetMainArray
) => {
  if (input === "") {
    return [];
  }
  let arr: Array<{ item: string; state: ElementStates }> = [];

  //массив букв из введенной строки без состояния
  const letters: Array<string> = input.split("");

  //все синие
  letters.forEach((item) =>
    arr.push({ item: item, state: ElementStates.Default })
  );

  let len = arr.length;
  let left = 0;
  let rigth = len - 1;

  setMainArray && setMainArray(arr);

  while (left <= rigth) {
    for (let i = 0; i < len; i++) {
      if (i === left || i === rigth) {
        arr[i].state = ElementStates.Changing;
      }
      //отправляем покрашенный массив на отрисовку
      setMainArray && setMainArray([...arr]);
    }

    //меняем местами и в свопе перекрашиваем
    if (setMainArray) {
      await delay(1000);

      swap(arr, left, rigth, setMainArray);
    } else {
      swap(arr, left, rigth);
    }

    left++;
    rigth--;
  }
  return arr;
};
