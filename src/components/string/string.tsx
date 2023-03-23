import React, {  FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { useSimpleForm } from "../../hooks/useForm";
import { onSubmitReverse } from "./utils";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const StringComponent: React.FC = () => {
  const {input, onChange, setInput} =useSimpleForm('')
  const [mainArray, setMainArray] = useState<Array<{item: string; state: ElementStates}>>([]);
  const [isLoading, setIsLoading] = useState(false);



  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInput("");

    onSubmitReverse(input, setMainArray)

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={input || ""}
            onChange={onChange}
            data-cy='input'
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={isLoading}
            disabled={input.length < 2}
            data-cy="button"
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
      </section>
    </SolutionLayout>
  );
};
