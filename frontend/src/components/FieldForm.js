import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Field = ({ placeholder, input, source, type }) => {
  return (
    <div className="input__container">
      <div className="input__container w-100">
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...input}
        />
        <div className="icon__input d-none d-sm-block">
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
