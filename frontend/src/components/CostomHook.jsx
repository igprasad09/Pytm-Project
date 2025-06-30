import { useState, useEffect } from "react";
export const  useDebounce = (input)=>{
      const [debounceValue, setDebounceValue] = useState(input);
      useEffect(()=>{
            const endofInterval = setInterval(() => {
                  setDebounceValue(input);
            }, 200);
            return ()=>{
                  clearInterval(endofInterval);
            }
      },[input]);
      return debounceValue;
} 