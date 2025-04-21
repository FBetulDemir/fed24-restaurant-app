//3.  och även en lägg till/ta bort funktion, med en counter därtill.
import React, { useState } from "react";

function Buttons() {
  const [count, setCount] = useState(0);
  const handleClickUp = () => setCount(count + 1);
  const handleClickDown = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 0));

  return (
    <div>
      <button onClick={handleClickUp}>LÄGG TILL</button>
      <div>{count}</div>
      <button onClick={handleClickDown}>TA BORT</button>
    </div>
  );
}
export default Buttons;
