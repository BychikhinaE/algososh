import { bubbleSort, selectionSort } from "./utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

const testArray = [
  {
    item: 11,
    state: ElementStates.Default,
  },
  {
    item: 20,
    state: ElementStates.Default,
  },
  {
    item: 5,
    state: ElementStates.Default,
  },
  {
    item: 8,
    state: ElementStates.Default,
  },
];

describe("Тестирование алгоритмов сортировки пузырьком", () => {
  it("пустой массив", async () => {
    const sorting = await bubbleSort([], Direction.Ascending);
    expect(sorting).toEqual([]);
  });
  it("массив из одного элемента", async () => {
    const sorting = await bubbleSort(
      [
        {
          item: 11,
          state: ElementStates.Default,
        },
      ],
      Direction.Ascending
    );
    expect(sorting).toEqual([
      {
        item: 11,
        state: ElementStates.Modified,
      },
    ]);
  });

  it("возрастание, массив из нескольких элементов", async () => {
    const sorting = await bubbleSort(testArray, Direction.Ascending);
    expect(sorting).toEqual([
      {
        item: 5,
        state: ElementStates.Modified,
      },
      {
        item: 8,
        state: ElementStates.Modified,
      },
      {
        item: 11,
        state: ElementStates.Modified,
      },
      {
        item: 20,
        state: ElementStates.Modified,
      },
    ]);
  });

  it("убывание, массив из нескольких элементов", async () => {
    const sorting = await bubbleSort(testArray, Direction.Descending);
    expect(sorting).toEqual([
      {
        item: 20,
        state: ElementStates.Modified,
      },
      {
        item: 11,
        state: ElementStates.Modified,
      },
      {
        item: 8,
        state: ElementStates.Modified,
      },
      {
        item: 5,
        state: ElementStates.Modified,
      },
    ]);
  });
});

describe("Тестирование алгоритмов сортировки выбором", () => {
  it("пустой массив", async () => {
    const sorting = await selectionSort([], Direction.Ascending);
    expect(sorting).toEqual([]);
  });

  it("массив из одного элемента", async () => {
    const sorting = await selectionSort(
      [
        {
          item: 11,
          state: ElementStates.Default,
        },
      ],
      Direction.Ascending
    );
    expect(sorting).toEqual([
      {
        item: 11,
        state: ElementStates.Modified,
      },
    ]);
  });

  it("возрастание, массив из нескольких элементов", async () => {
    const sorting = await selectionSort(testArray, Direction.Ascending);
    expect(sorting).toEqual([
      {
        item: 5,
        state: ElementStates.Modified,
      },
      {
        item: 8,
        state: ElementStates.Modified,
      },
      {
        item: 11,
        state: ElementStates.Modified,
      },
      {
        item: 20,
        state: ElementStates.Modified,
      },
    ]);
  });

  it("убывание, массив из нескольких элементов", async () => {
    const sorting = await selectionSort(testArray, Direction.Descending);
    expect(sorting).toEqual([
      {
        item: 20,
        state: ElementStates.Modified,
      },
      {
        item: 11,
        state: ElementStates.Modified,
      },
      {
        item: 8,
        state: ElementStates.Modified,
      },
      {
        item: 5,
        state: ElementStates.Modified,
      },
    ]);
  });
});
