import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";
import { delay } from "../string/string";
import { useSimpleForm } from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const [mainArray, setMainArray] = useState<Array<number>>([]);
  const { input, onChange, setInput } = useSimpleForm("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput("");
    const fibNumbers = async (n: number) => {
      setMainArray([1]);
      await delay(500);

      setMainArray([1, 1]);
      await delay(500);

      let arr: number[] = [1, 1];

      for (let i = 2; i <= n; i++) {
        await delay(500);

        arr.push(arr[i - 2] + arr[i - 1]);

        setMainArray([...arr]);
      }
    };

    await fibNumbers(Number(input));
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            type="number"
            max={19}
            value={input}
            onChange={onChange}
            data-cy="input"
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={isLoading}
            disabled={!input || Number(input) > 19 || Number(input) === 0}
            data-cy="button"
          />
        </form>
        {mainArray && (
          <ul className={styles.list}>
            {mainArray.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle letter={item.toString()} index={index} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </SolutionLayout>
  );
};
