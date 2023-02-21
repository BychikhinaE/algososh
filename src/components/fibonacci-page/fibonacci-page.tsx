import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css'

export const FibonacciPage: React.FC = () => {
  const arr: ReadonlyArray<number> = [];
  const [input, setInput] = useState<number | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // :^(
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={onSubmit}>
        <Input
          isLimitText={true}
          maxLength={19}
          value={input}
          onChange={onChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={false}
          disabled={false}
        />
      </form>
      {arr.length>0 && (
        <ul>
          {arr.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item}
                // state={}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
