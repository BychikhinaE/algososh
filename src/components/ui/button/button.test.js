import { Button } from "./button";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Тестирование компонента Button", () => {
  it("кнопка с текстом", () => {
    const buttonWithText = renderer.create(<Button text="text" />);
    expect(buttonWithText).toMatchSnapshot();
  });

  it("кнопка без текста", () => {
    const buttonWithoutText = renderer.create(<Button />);
    expect(buttonWithoutText).toMatchSnapshot();
  });

  it("заблокированная кнопка", () => {
    const buttonDisabled = renderer.create(<Button disabled={true} />);
    expect(buttonDisabled).toMatchSnapshot();
  });

  it("кнопка с индикацией загрузки", () => {
    const buttonWithLoader = renderer.create(<Button isLoader={true} />);
    expect(buttonWithLoader).toMatchSnapshot();
  });

  describe("корректность вызова колбека при клике на кнопку", () => {
    it("вызов колбека при клике на кнопку корректен", () => {
      const callBack = jest.fn();
      render(<Button onClick={callBack} />);
      const button = screen.getByTestId("button");
      fireEvent.click(button);
      expect(callBack).toHaveBeenCalled();
    });
  });
});
