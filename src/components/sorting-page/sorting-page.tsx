import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting.module.css";

export const SortingPage: React.FC = () => {
  //массив должен состоять из целых чисел [0; 100]
  //минимальное количество элементов массива minLen = 3, максимальное maxLen = 17.
  //Максимальное значение элемента массива равно 100, это же значение является процентным соотношением высоты столбца.
  //В качестве максимальной высоты считайте 340px.
  // высоты элементов массива
  // `${(340 * arr[i]) / 100}px`

  const randomArr = () => {};
  const [checked, setChecked] = useState<string>("selection");
  const sortAscending = () => {};
  const sortDescending = () => {};
  const sortNewArray = () => {};
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.filters}>
        <RadioInput
          label="Выбор"
          name="sorting"
          value="select"
          checked={checked === "select"}
          onChange={setChecked("select")}
          disabled={false}
        />
        <RadioInput
          label="Пузырёк"
          name="sorting"
          value="bubble"
          checked={checked === "bubble"}
          onChange={setChecked("bubble")}
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
    </SolutionLayout>
  );
};
