import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from ".";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";

type TElemArray = {
  item?: string;
  state: ElementStates;
  isTail?: boolean;
  isHead?: boolean;
};

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const [mainArray, setMainArray] = useState<Array<TElemArray>>(
    Array.from({ length: 7 }, () => ({
      state: ElementStates.Default,
    }))
  );

  const [queue] = useState(new Queue<TElemArray>(7));
  const [isDisabled, setIsDisabled] = useState({
    buttonDelete: true,
    buttonClean: true,
  });
  const [indexTail, setIndexTail] = useState(queue.getIndexTail());

  const [indexHead, setIndexHead] = useState(queue.getIndexHead());
  //кнопкa «Добавить», по клику на неё должен вызываться метод очереди enqueue(item)
  const onClickAdd = async () => {
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
    setIsDisabled({ buttonDelete: false, buttonClean: false });
    setIndexTail(queue.getIndexTail());
    setIndexHead(queue.getIndexHead());
  };

  //кнопкa «Удалить», по клику на неё должен вызываться метод очереди dequeue();
  const onClickDelete = async () => {
    //в примере-анимации tail указывает на предыдщий для queue элемент и значит удалить совпадение мы не можем, хвост позади головы получится
    if (indexHead === indexTail - 1) {
      if (indexHead === 6) {
        mainArray[indexHead] = {
          item: "",
          state: ElementStates.Default,
          isTail: false,
          isHead: true,
        };
        setIsDisabled({ buttonDelete: true, buttonClean: false });
      } 
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

    setIsDisabled({ buttonDelete: true, buttonClean: true });
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
          />
          <Button
            text="Добавить"
            onClick={onClickAdd}
            disabled={input.length === 0 || indexTail === 7 ? true : false}
          />
          <Button
            text="Удалить"
            onClick={onClickDelete}
            disabled={isDisabled.buttonDelete}
          />
          <div> </div>
          <Button
            text="Очистить"
            onClick={onClickClean}
            disabled={isDisabled.buttonClean}
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
