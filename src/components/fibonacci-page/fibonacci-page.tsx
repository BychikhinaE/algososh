import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";
import { delay } from "../string/string";

export const FibonacciPage: React.FC = () => {
  //const arr: Array<number> = [];
  const [mainArray, setMainArray] = useState<Array<number>>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput('')
    const fibNumbers = async (n: number) => {
      setMainArray([1]);
      await delay(500);

      setMainArray([1, 1]);
      await delay(500);

      let arr: number[] = [1, 1];

      for (let i = 2; i <= n ; i++) {

        await delay(500);

        arr.push(arr[i - 2] + arr[i - 1]);

        setMainArray([...arr]);
      }
      console.log(arr);
    };

    input && fibNumbers(Number(input));
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <article className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            type='number'
            max={19}
            value={input}
            onChange={onChange}

          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={isLoading}
            disabled={!input || Number(input)>19 || Number(input)===0}
          />
        </form>
        {mainArray && (
          <ul className={styles.list}>
            {mainArray.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle
                  letter={item.toString()}
                  index={index}
                />
              </li>
            ))}
          </ul>
        )}
      </article>
    </SolutionLayout>
  );
};
