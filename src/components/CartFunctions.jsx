//3.  och även en lägg till/ta bort funktion, med en counter därtill.
import React, { useState } from "react";
export function increaseNumber(number) {
  return number + 1;
}

export function decreaseNumber(number) {
  return number - 1;
}

export function numbers() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <button onClick={() => setNumber(increaseNumber(number))}></button>
      <button onClick={() => setNumber(decreaseNumber(number))}></button>
    </div>
  );
}
