import { Box } from "@src/common/atoms";
import { FieldError } from "@src/common/error/FieldError";
import ReactCodeInput from "react-code-input";

export interface AppInputProps {
  onChange: (v: any) => void;
  value: string;
  error?: string;
  id?: string;
}

const props = {
  inputStyle: {
    margin: "5px",
    width: "58px",
    borderRadius: "15px",
    fontSize: "25px",
    height: "58px",
    paddingLeft: "20px",
    backgroundColor: "white",
    color: "#2F354C",
    border: "1px solid #2F354C",
  },
  inputStyleInvalid: {
    margin: "5px",
    width: "58px",
    borderRadius: "15px",
    fontSize: "25px",
    height: "58px",
    paddingLeft: "20px",
    backgroundColor: "white",
    color: "#2F354C",
    border: "1px solid red",
  },
};

export const VerifyCodeInput = ({ onChange, error, value }: AppInputProps) => {
  const isError = Boolean(error);
  return (
    <Box className="relative">
      {isError && <FieldError error={error} />}
      <ReactCodeInput
        fields={4}
        name="exampleCodeInput"
        inputMode="numeric"
        type="number"
        onChange={onChange}
        value={value}
        {...props}
        inputStyle={isError ? props.inputStyleInvalid : props.inputStyle}
      />
    </Box>
  );
};
