import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from ".";
import { delay } from "../string/string";

type TElemArray = { item: string; state: ElementStates };

//лоудер и блокировка кнопок..
export const StackPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [mainArray, setMainArray] = useState<Array<TElemArray>>([]);
  const [st] = useState(new Stack<TElemArray>());

  const onClickAdd = async () => {
    st.push({
      item: input,
      state: ElementStates.Changing,
    });
  //  console.log(st.getItems())

    setMainArray([...st.getItems()]);
    setInput("");
    await delay(500);
   //console.log(st.peak)
   st.peak()!.state = ElementStates.Default;
   //console.log(st.peak)
    setMainArray([...st.getItems()]);
   // console.log(mainArray)
  };

  const onClickDelete = async () => {
    if(st.peak()){

      st.peak()!.state = ElementStates.Changing;
    setMainArray([...st.getItems()]);
    await delay(500);
    st.pop();
    setMainArray([...st.getItems()]);
  }
  };

  const onClickClean = () => {
    st.clean();
    setMainArray([...st.getItems()]);
  };

  return (
    <SolutionLayout title="Стек">
      <article className={styles.container}>
        <form className={styles.form}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            value={input}
            onChange={onChange}
          />
          <Button
            text="Добавить"
            onClick={onClickAdd}
            disabled={false}
            isLoader={false}
          />
          <Button
            text="Удалить"
            onClick={onClickDelete}
            disabled={false}
            isLoader={false}
          />
          {/* мне стыдно за такую верстку, но это было быстро */}
          <div> </div>
          <Button
            text="Очистить"
            onClick={onClickClean}
            disabled={false}
            isLoader={false}
          />
        </form>
        <ul className={styles.list}>
          {mainArray &&
            mainArray.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle letter={item.item} state={item.state} index={index} />
              </li>
            ))}
        </ul>
      </article>
    </SolutionLayout>
  );
};
