import { Label } from "reactstrap";
import "./styles.scss";

export const InputLabel = ({ title, required, style }) => {
  return (
    <Label
      style={{
        ...style,
        height: 40,
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
      }}
      className="input-label"
    >
      {title}
      {required && <span style={{ color: "red" }}>*</span>}
    </Label>
  );
};

export const InputsRow = ({ children, style, customClass }) => {
  return (
    <div
      className={`input-row ${customClass ? customClass : ""}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};
