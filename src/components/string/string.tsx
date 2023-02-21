import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const arr: Array<string> = [];
  const [input, setInput] = useState<string>("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // :^(
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={input}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
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
