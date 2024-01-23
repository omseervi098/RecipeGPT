import { Calendar } from "primereact/calendar";
import style from "./EditableFieldForm.module.css";
import { Inplace, InplaceContent, InplaceDisplay } from "primereact/inplace";
import { InputText } from "primereact/inputtext";
import DropdownwithSearch from "../dropdown/dropdown";
const EditableFieldForm = ({
  label,
  value,
  handleChange,
  name,
  type,
  className,
  options,
  placeholder,
}) => {
  return (
    <div className={`${style.detail_input} mt-2`}>
      <span className={`d-none d-sm-inline ${style.detail_input_label}`}>
        {label}
      </span>

      <Inplace closable className={`text-center`}>
        <InplaceDisplay>
          <span className={`d-inline d-sm-none ${style.detail_input_label}`}>
            {label}
          </span>
          <input
            type="text"
            className={`${style.detail_value}`}
            value={(function () {
              if (value) {
                if (type === "date") {
                  return new Date(value).toLocaleDateString();
                } else {
                  return value;
                }
              } else {
                return "Click to Add";
              }
            })()}
            readOnly
          />
        </InplaceDisplay>
        <InplaceContent>
          {type === "text" && (
            <InputText
              value={value}
              onChange={(e) => {
                const value = e.target.value;
                handleChange({ name, value, type });
              }}
              autoFocus
            />
          )}
          {type === "date" && (
            <Calendar
              value={value}
              onChange={(e) => {
                const value = e.value;
                handleChange({ name, value, type });
              }}
              autoFocus
            />
          )}
          {type === "dropdown" && (
            <DropdownwithSearch
              value={value}
              handleChange={handleChange}
              name={name}
              type={type}
              className={className}
              options={options}
              placeholder={placeholder}
              autoFocus
            />
          )}
        </InplaceContent>
      </Inplace>
    </div>
  );
};
export default EditableFieldForm;
