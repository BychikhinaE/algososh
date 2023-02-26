import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list.module.css";
import { LinkedList } from ".";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TElem = {
  item: string;
  state: ElementStates;
  // head?: string;
  // tail?: string;
};
type elemSmallCircle = {
  item: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const [inputElement, setInputElement] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");
  const [mainArray, setMainArray] = useState<Array<TElem>>([]);
  const [isLoader, setIsLoader] = useState({
    forButtHead: false,
    forButtTail: false,
    forButtDelHead: false,
    forButtDelTail: false,
    forButtAddByInd: false,
    forButtDelByInd: false,
    allDis: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputElement(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };
  const [list, setList] = useState(new LinkedList<TElem>());
  const [newElemInHead, setNewElemInHead] = useState<elemSmallCircle | null>(
    null
  );
  const [delElemInTail, setDelElemInTail] = useState<elemSmallCircle | null>(
    null
  );

  useEffect(() => {
    // добавить список из 4 элементов при первой отрисовке
    const array: Array<TElem> = [];
    for (let i = 0; i < 4; i++) {
      array.push({
        item: Math.round(Math.random() * 100).toString(),
        state: ElementStates.Default,
      });
    }
    setList(new LinkedList(array));
    setMainArray(array);
  }, []);

  //ДОБАВИТЬ ЭЛЕМЕНТ В НАЧАЛО
  const addInHead = async () => {
    //Состояния кнопок
    setIsLoader((prevState) => ({
      ...prevState,
      forButtHead: true,
      allDis: true,
    }));

    //Переписали значение в newElem и сбросили input
    const newElem = {
      item: inputElement,
      state: ElementStates.Default,
    };
    setInputElement("");

    //Покажим элемент сверху
    setNewElemInHead({ item: newElem.item, index: 0 });
    await delay(500);
    setNewElemInHead(null);

    //теперь зеленым выделим
    mainArray.unshift({ item: newElem.item, state: ElementStates.Modified });
    setMainArray([...mainArray]);
    await delay(500);

    list.prepend(newElem);
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtHead: false,
      allDis: false,
    }));
  };

  //ДОБАВИТЬ ЭЛЕМЕНТ В КОНЕЦ
  const addInTail = async () => {
    setIsLoader((prevState) => ({
      ...prevState,
      forButtTail: true,
      allDis: true,
    }));
    //Переписали значение в newElem и сбросили input
    const newElem = {
      item: inputElement,
      state: ElementStates.Default,
    };
    setInputElement("");
    //Покажим элемент сверху
    setNewElemInHead({ item: newElem.item, index: mainArray.length - 1 });
    await delay(500);
    setNewElemInHead(null);

    //теперь раскрасим массив
    const colorArr = mainArray.map((elem) => {
      return {
        item: elem.item,
        state: ElementStates.Changing,
      };
    });
    colorArr.push({ item: newElem.item, state: ElementStates.Modified });
    setMainArray(colorArr);
    await delay(1000);

    // Добавим в список, обновим картинку -все синие кружки
    list.append(newElem);
    await mainArray.forEach((elem) => (elem.state = ElementStates.Default));
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtTail: false,
      allDis: false,
    }));
  };

  //ДОБАВИМ ПО ИНДЕКСУ
  const addByIndex = async () => {
    setIsLoader((prevState) => ({
      ...prevState,
      forButtAddByInd: true,
      allDis: true,
    }));
    //Переписали значение в newElem и сбросили input
    const newElem = {
      item: inputElement,
      state: ElementStates.Default,
    };
    const index = Number(inputIndex);
    setInputElement("");
    setInputIndex("");

    //Покажим элемент сверху
    setNewElemInHead({ item: newElem.item, index: index });
    await delay(500);
    setNewElemInHead(null);

    //теперь раскрасим массив
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex < index) {
        return {
          item: elem.item,
          state: ElementStates.Changing,
        };
      } else {
        return elem;
      }
    });
    colorArr.splice(index, 0, {
      item: newElem.item,
      state: ElementStates.Modified,
    });
    setMainArray(colorArr);
    await delay(1000);

    // Добавим в список, обновим картинку -все синие кружки
    list.insertAt(newElem, index);
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtAddByInd: false,
      allDis: false,
    }));
  };

  //УДАЛИТЬ ИЗ НАЧАЛА
  const deleteFromHead = async () => {
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelHead: true,
      allDis: true,
    }));

    //Покажим элемент снизу
    setDelElemInTail({ item: mainArray[0].item, index: 0 });
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex === 0) {
        return { item: "", state: ElementStates.Changing };
      } else {
        return elem;
      }
    });
    setMainArray(colorArr);
    await delay(500);
    setDelElemInTail(null);

    // удалим из списка, обновим картинку -все синие кружки
    list.deleteHead();
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelHead: false,
      allDis: false,
    }));
  };

  //УДАЛИТЬ ИЗ КОНЦА
  const deleteFromTail = async () => {
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelTail: true,
      allDis: true,
    }));

    const indLastElem = mainArray.length > 1 ? mainArray.length - 1 : 0;
    //раскрасим массив
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex < indLastElem) {
        return {
          item: elem.item,
          state: ElementStates.Changing,
        };
      } else {
        return {
          item: "",
          state: ElementStates.Changing,
        };
      }
    });
    setMainArray(colorArr);

    //Покажим элемент снизу
    setDelElemInTail({ item: mainArray[indLastElem].item, index: indLastElem });
    await delay(500);
    setDelElemInTail(null);

    // удалим из списка, обновим картинку -все синие кружки
    list.deleteTail();
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelTail: false,
      allDis: false,
    }));
  };

  //УДАЛИТЬ ПО ИНДЕКСУ
  const deleteByIndex = async () => {
    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelByInd: true,
      allDis: true,
    }));
    let index = Number(inputIndex);
    setInputIndex("");

    //раскрасим массив
    const colorArr = mainArray.map((elem, currIndex) => {
      if (currIndex < index) {
        return {
          item: elem.item,
          state: ElementStates.Changing,
        };
      } else if (currIndex === index) {
        return {
          item: "",
          state: ElementStates.Changing,
        };
      } else {
        return elem;
      }
    });
    setMainArray(colorArr);

    //Покажим элемент снизу
    setDelElemInTail({ item: mainArray[index].item, index: index });
    await delay(500);
    setDelElemInTail(null);

    // удалим из списка, обновим картинку -все синие кружки
    list.deleteByIndex(index);
    setMainArray(list.toArray());

    setIsLoader((prevState) => ({
      ...prevState,
      forButtDelByInd: false,
      allDis: false,
    }));
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.container}>
        <div className={styles.form}>
          <Input
            type="text"
            isLimitText={true}
            maxLength={4}
            placeholder="Введите значение"
            value={inputElement}
            onChange={onChange}
          />
          <Button
            text="Добавить в head"
            onClick={addInHead}
            isLoader={isLoader.forButtHead}
            disabled={inputElement.length === 0 || isLoader.allDis}
          />
          <Button
            text="Добавить в tail"
            onClick={addInTail}
            isLoader={isLoader.forButtTail}
            disabled={inputElement.length === 0 || isLoader.allDis}
          />
          <Button
            text="Удалить из head"
            onClick={deleteFromHead}
            isLoader={isLoader.forButtDelHead}
            disabled={mainArray.length === 0 || isLoader.allDis}
          />
          <Button
            text="Удалить из tail"
            onClick={deleteFromTail}
            isLoader={isLoader.forButtDelTail}
            disabled={mainArray.length === 0 || isLoader.allDis}
          />
        </div>
        <div className={styles.formIndex}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndex}
            onChange={onChangeIndex}
          />
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            isLoader={isLoader.forButtAddByInd}
            disabled={
              inputElement.length !== 0 && inputIndex.length !== 0
                ? false
                : true
            }
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteByIndex}
            isLoader={isLoader.forButtDelByInd}
            disabled={
              mainArray.length === 0 ||
              isLoader.allDis ||
              inputIndex.length === 0
            }
          />
        </div>
        <ul className={styles.list}>
          {mainArray.length !== 0 &&
            mainArray.map(({ item, state }, index) => (
              <li key={index} className={styles.item}>
                <Circle
                  letter={item}
                  state={state}
                  index={index}
                  head={
                    newElemInHead?.index === index ? (
                      <Circle
                        letter={newElemInHead.item}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    ) : index === 0 ? (
                      "head"
                    ) : null
                  }
                  tail={
                    delElemInTail?.index === index ? (
                      <Circle
                        letter={delElemInTail.item}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    ) : index === mainArray.length - 1 ? (
                      "tail"
                    ) : null
                  }
                />
                {index + 1 < mainArray.length && <ArrowIcon />}
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
