import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./FieldForm.module.css";
const Field = ({ placeholder, input, name, source, type }) => {
  return (
    <div className={`${style.input__container}`}>
      <div className={`${style.input__container} `}>
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          name={name}
          {...input}
        />
        <div className={`${style.icon__input} d-none d-sm-block`}>
          <FontAwesomeIcon
            icon={source}
            style={{
              color: "#1e9494",
              height: "1.5rem",
              width: "1.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Field;
