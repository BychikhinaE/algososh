import React, { useState, useEffect, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./list.module.css";
import { LinkedList } from ".";
import { ElementStates } from "../../types/element-states";
import { delay } from "../string/string";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { useForm } from "../../hooks/useForm";

type TElem = {
  item: string;
  state: ElementStates;
};
type elemSmallCircle = {
  item: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const { values, onChange, setValues } = useForm({
    inputElement: "",
    inputIndex: "",
  });
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

  const isValidIndex = useMemo(() => {
    if (values.inputIndex.length === 0) {
      return false;
    } else if (
      Number(values.inputIndex) < mainArray.length &&
      Number(values.inputIndex) > -1
    ) {
      return true;
    } else {
      return false;
    }
  }, [mainArray.length, values.inputIndex]);

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
      item: values.inputElement,
      state: ElementStates.Default,
    };
    setValues({ ...values, inputElement: "" });

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
      item: values.inputElement,
      state: ElementStates.Default,
    };
    setValues({ ...values, inputElement: "" });
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
      item: values.inputElement,
      state: ElementStates.Default,
    };
    const index = Number(values.inputIndex);
    setValues({ ...values, inputElement: "", inputIndex: "" });

    let colorArr = mainArray.slice();
    //Покажим элемент сверху
    for (let i = 0; i <= index; i++) {
      setNewElemInHead({ item: newElem.item, index: i });
      colorArr = mainArray.map((elem, currIndex) => {
        if (currIndex < i) {
          return {
            item: elem.item,
            state: ElementStates.Changing,
          };
        } else {
          return elem;
        }
      });
      setMainArray(colorArr);
      await delay(1000);
    }

    colorArr.splice(index, 0, {
      item: newElem.item,
      state: ElementStates.Modified,
    });

    setNewElemInHead(null);

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
    let index = Number(values.inputIndex);
    setValues({ ...values, inputIndex: "" });

    let colorArr = mainArray.slice();

    //код анимации
    for (let i = 0; i <= index; i++) {

      colorArr = mainArray.map((elem, currIndex) => {
        if (currIndex <= i) {
          return {
            item: elem.item,
            state: ElementStates.Changing,
          };
        } else {
          return elem;
        }
      });
      setMainArray(colorArr);
      await delay(1000);
    }

    colorArr[index] = {
      item: "",
      state: ElementStates.Default,
    };
    setMainArray(colorArr);
    await delay(500);
    //покажем снизу удаляемый элемент
    setDelElemInTail({ item: mainArray[index].item, index: index });
    await delay(1000);
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
            name="inputElement"
            value={values.inputElement}
            onChange={onChange}
            data-cy="input-el"
          />
          <Button
            text="Добавить в head"
            onClick={addInHead}
            isLoader={isLoader.forButtHead}
            disabled={values.inputElement.length === 0 || isLoader.allDis}
            data-cy="add-head"
          />
          <Button
            text="Добавить в tail"
            onClick={addInTail}
            isLoader={isLoader.forButtTail}
            disabled={values.inputElement.length === 0 || isLoader.allDis}
            data-cy="add-tail"
          />
          <Button
            text="Удалить из head"
            onClick={deleteFromHead}
            isLoader={isLoader.forButtDelHead}
            disabled={mainArray.length === 0 || isLoader.allDis}
            data-cy="delete-head"
          />
          <Button
            text="Удалить из tail"
            onClick={deleteFromTail}
            isLoader={isLoader.forButtDelTail}
            disabled={mainArray.length === 0 || isLoader.allDis}
            data-cy="delete-tail"
          />
        </div>
        <div className={styles.formIndex}>
          <Input
            type="number"
            placeholder="Введите индекс"
            name="inputIndex"
            value={values.inputIndex}
            onChange={onChange}
            data-cy="input-index"
          />
          <Button
            text="Добавить по индексу"
            onClick={addByIndex}
            isLoader={isLoader.forButtAddByInd}
            disabled={
              values.inputElement.length !== 0 && isValidIndex ? false : true
            }
            data-cy="add-by-index"
          />
          <Button
            text="Удалить по индексу"
            onClick={deleteByIndex}
            isLoader={isLoader.forButtDelByInd}
            disabled={
              mainArray.length === 0 || isLoader.allDis || !isValidIndex
            }
            data-cy="delete-by-index"
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
                {index + 1 < mainArray.length && (
                  <ArrowIcon
                    fill={
                      state === ElementStates.Changing ? "#d252e1" : "#0032FF"
                    }
                  />
                )}
              </li>
            ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
