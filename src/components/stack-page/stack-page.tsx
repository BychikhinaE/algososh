import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from ".";
import { delay } from "../string/string";
import { useSimpleForm } from "../../hooks/useForm";

type TElemArray = { item: string; state: ElementStates };

export const StackPage: React.FC = () => {
  const {input, onChange, setInput} =useSimpleForm('')
  const [buttonState, setButtonState] = useState({
    isLoadForButtAdd: false,
    isLoadForButtDel: false,
  });

  const [mainArray, setMainArray] = useState<Array<TElemArray>>([]);
  const [st] = useState(new Stack<TElemArray>());

  const onClickAdd = async () => {
    setButtonState((prevState)=>({
      ...prevState,
      isLoadForButtAdd: true,
    }))
    st.push({
      item: input,
      state: ElementStates.Changing,
    });

    setMainArray([...st.getItems()]);
    setInput("");
    await delay(500);
    st.peak()!.state = ElementStates.Default;
    setMainArray([...st.getItems()]);

    setButtonState((prevState)=>({
      ...prevState,
      isLoadForButtAdd: false,
    }))
  };

  const onClickDelete = async () => {
    setButtonState((prevState)=>({
      ...prevState,
      isLoadForButtDel: true,
    }))

    if (st.peak()) {
      st.peak()!.state = ElementStates.Changing;
      setMainArray([...st.getItems()]);
      await delay(500);
      st.pop();
      setMainArray([...st.getItems()]);
    }

    setButtonState((prevState)=>({
      ...prevState,
      isLoadForButtDel: false,
    }))
  };

  const onClickClean = () => {
    st.clean();
    setMainArray([...st.getItems()]);
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.container}>
        <div className={styles.form}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            value={input}
            onChange={onChange}
            data-cy="input"
          />
          <Button
            text="Добавить"
            onClick={onClickAdd}
            disabled={input.length === 0}
            isLoader={buttonState.isLoadForButtAdd}
            data-cy="btn-add"
          />
          <Button
            text="Удалить"
            onClick={onClickDelete}
            disabled={st.isEmpty()}
            isLoader={buttonState.isLoadForButtDel}
            data-cy="btn-delete"
          />
          <div> </div>
          <Button
            text="Очистить"
            onClick={onClickClean}
            disabled={st.isEmpty()}
            data-cy="btn-clean"
          />
        </div>
        <ul className={styles.list}>
          {mainArray &&
            mainArray.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle 
                letter={item.item} 
                state={item.state} 
                index={index} 
                head={index === (st.getSize() - 1) ? 'top' : ''}
                />
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
