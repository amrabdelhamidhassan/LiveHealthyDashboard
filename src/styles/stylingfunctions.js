
import { useState,useMemo,useEffect } from "react";
import './components/Table.css'
export const Counter = (start, end,percentage=false) => {

    const title=end;
    const [count, setCount] = useState(start);
    const increment = useMemo(() => end/200, [end]);
    const doIncrement = () => {
      if(count < end) {
        const timer = setTimeout(
          () => setCount(
            count < (end - increment)
              ? count + increment
              : end
          ),
          1);
        return () => clearTimeout(timer);
      }
    }
    useEffect(doIncrement, [count, end, increment]);

    return (
      <div>{parseInt(count)+(percentage?'%':'')}</div>
    )
  }