import { onSubmitReverse } from "./utils";

describe("Корректно разворачивает строку:", () => {
  it("с чётным количеством символов", async () => {
    const string = await onSubmitReverse("1234");
    expect(string).toEqual([
        {
            item: "4",
            state: "modified",
          },
        {
            item: "3",
            state: "modified",
          },
          {
            item: "2",
            state: "modified",
          },
          {
            item: "1",
            state: "modified",
          },
    ]);
  });

  it("с нечетным количеством символов", async () => {
    const string = await onSubmitReverse("123");
    expect(string).toEqual([
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "modified",
      },
      {
        item: "1",
        state: "modified",
      },
    ]);
  });

  it("с одним символом", async () => {
    const string = await onSubmitReverse("1");
    expect(string).toEqual([
        {
            item: "1",
            state: "modified",
          }
    ]);
  });

  it("пустую строку", async () => {
    const string = await onSubmitReverse("");
    expect(string).toEqual([]);
  });
});
