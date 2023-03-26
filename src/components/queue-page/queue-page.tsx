import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from ".";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";
import { useSimpleForm } from "../../hooks/useForm";

type TElemArray = {
  item?: string;
  state: ElementStates;
  isTail?: boolean;
  isHead?: boolean;
};

export const QueuePage: React.FC = () => {
  const { input, onChange, setInput } = useSimpleForm("");
  const [mainArray, setMainArray] = useState<Array<TElemArray>>(
    Array.from({ length: 7 }, () => ({
      state: ElementStates.Default,
    }))
  );

  const [queue] = useState(new Queue<TElemArray>(7));
  const [buttonState, setButtonState] = useState({
    buttonDelete: true,
    buttonClean: true,
    isLoadForButtAdd: false,
    isLoadForButtDel: false,
  });

  const [indexTail, setIndexTail] = useState(queue.getIndexTail());

  const [indexHead, setIndexHead] = useState(queue.getIndexHead());
  //кнопкa «Добавить», по клику на неё должен вызываться метод очереди enqueue(item)
  const onClickAdd = async () => {
    setButtonState((prevState) => ({
      ...prevState,
      isLoadForButtAdd: true,
    }));

    mainArray[indexTail].state = ElementStates.Changing;
    setMainArray([...mainArray]);

    await delay(500);

    //добавили в очередь
    queue.enqueue({ item: input, state: ElementStates.Default });

    mainArray[indexTail] = {
      item: input,
      state: ElementStates.Default,
      isTail: true,
      isHead: true,
    };
    if (indexTail - 1 > -1) {
      mainArray[indexTail - 1].isTail = false;
    }
    setMainArray([...mainArray]);

    setInput("");
    setButtonState((prevState) => ({
      ...prevState,
      isLoadForButtAdd: false,
      buttonDelete: false,
      buttonClean: false,
    }));
    setIndexTail(queue.getIndexTail());
    setIndexHead(queue.getIndexHead());
  };

  //кнопкa «Удалить», по клику на неё должен вызываться метод очереди dequeue();
  const onClickDelete = async () => {
    setButtonState((prevState) => ({
      ...prevState,
      isLoadForButtDel: true,
    }));
    //в примере-анимации tail указывает на предыдущий для queue элемент и значит удалить совпадение мы не можем, хвост позади головы получится
    if (indexHead === indexTail - 1) {
      if (indexHead === 6) {
        mainArray[indexHead] = {
          item: "",
          state: ElementStates.Default,
          isTail: false,
          isHead: true,
        };
        setButtonState((prevState) => ({
          ...prevState,
          isLoadForButtDel: false,
          buttonDelete: true,
          buttonClean: false,
        }));
      }
      setButtonState((prevState) => ({
        ...prevState,
        isLoadForButtDel: false,
        buttonDelete: true,
      }));
      setMainArray([...mainArray]);
      return;
    }
    mainArray[indexHead].state = ElementStates.Changing;
    setMainArray([...mainArray]);

    await delay(500);

    queue.dequeue();

    mainArray[indexHead] = {
      item: "",
      state: ElementStates.Default,
      isHead: true,
    };

    setButtonState((prevState) => ({
      ...prevState,
      isLoadForButtDel: false,
    }));
    setMainArray([...mainArray]);
    setIndexHead(queue.getIndexHead());
    setIndexTail(queue.getIndexTail());
  };

  const onClickClean = () => {
    queue.clean();
    mainArray.forEach((item) => {
      item.item = "";
      item.state = ElementStates.Default;
      item.isTail = false;
      item.isHead = false;
    });

    setButtonState((prevState) => ({
      ...prevState,
      buttonDelete: true,
      buttonClean: true,
    }));
    setMainArray([...mainArray]);
    setIndexHead(queue.getIndexHead());
    setIndexTail(queue.getIndexTail());
  };

  return (
    <SolutionLayout title="Очередь">
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
            disabled={input.length === 0 || indexTail === 7 ? true : false}
            isLoader={buttonState.isLoadForButtAdd}
            data-cy="btn-add"
          />
          <Button
            text="Удалить"
            onClick={onClickDelete}
            disabled={buttonState.buttonDelete}
            isLoader={buttonState.isLoadForButtDel}
            data-cy="btn-delete"
          />
          <div> </div>
          <Button
            text="Очистить"
            onClick={onClickClean}
            disabled={buttonState.buttonClean}
            data-cy="btn-clean"
          />
        </div>
        <ul className={styles.list}>
          {mainArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.item}
                index={index}
                head={
                  item.isHead && queue.getIndexHead() === index ? "head" : ""
                }
                tail={item.isTail ? "tail" : ""}
                state={item.state}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
