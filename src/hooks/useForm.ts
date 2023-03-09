import { useState, ChangeEvent } from "react";

// input, onChange, setInput
export function useSimpleForm(inputValue: string) {
  const [input, setInput] = useState(inputValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault()
    const input = event.target.value;
    setInput(input);
  };
  return { input, onChange, setInput };
}

export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, onChange, setValues };
}
