import { Circle } from "./circle";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  it("без буквы", () => {
    const circleWithoutLetter = renderer.create(<Circle />);
    expect(circleWithoutLetter).toMatchSnapshot();
  });

  it("с буквами", () => {
    const circleWithLetter = renderer.create(<Circle letter="test" />);
    expect(circleWithLetter).toMatchSnapshot();
  });

  it("с head", () => {
    const circleWithHead = renderer.create(<Circle head="head" />);
    expect(circleWithHead).toMatchSnapshot();
  });

  it("с react-элементом в head", () => {
    const circleWithElementH = renderer.create(<Circle head={<Circle />} />);
    expect(circleWithElementH).toMatchSnapshot();
  });

  it("с tail", () => {
    const circleWithTail = renderer.create(<Circle tail="tail" />);
    expect(circleWithTail).toMatchSnapshot();
  });

  it("с react-элементом в tail", () => {
    const circleWithElementT = renderer.create(<Circle tail={<Circle />} />);
    expect(circleWithElementT).toMatchSnapshot();
  });

  it("с index", () => {
    const circleWithIndex = renderer.create(<Circle index={1} />);
    expect(circleWithIndex).toMatchSnapshot();
  });

  it("с пропом isSmall === true", () => {
    const circleSmall = renderer.create(<Circle isSmall={true} />);
    expect(circleSmall).toMatchSnapshot();
  });

  it("в состоянии default", () => {
    const circleDefault = renderer.create(
      <Circle state={ElementStates.Default} />
    );
    expect(circleDefault).toMatchSnapshot();
  });

  it("в состоянии  changing", () => {
    const circleChanging = renderer.create(
      <Circle state={ElementStates.Changing} />
    );
    expect(circleChanging).toMatchSnapshot();
  });

  it("в состоянии  modified", () => {
    const circleModified = renderer.create(
      <Circle state={ElementStates.Modified} />
    );
    expect(circleModified).toMatchSnapshot();
  });
});
