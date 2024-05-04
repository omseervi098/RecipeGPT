import React, { useState, useEffect, useRef } from "react";
import { ProgressBar } from "primereact/progressbar";
import { toast } from "react-toastify";

export default function Progressbar(props) {
  const [value, setValue] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    let _val = value;

    interval.current = setInterval(() => {
      _val += Math.floor(Math.random() * 2) + 1;

      if (props.loading || _val >= 100) {
        _val = 100;
        toast.success("Recipe Generated Successfully");
        clearInterval(interval.current);
      }

      setValue(_val);
    }, 400);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  return (
    <div className="card">
      <ProgressBar value={value}></ProgressBar>
    </div>
  );
}
