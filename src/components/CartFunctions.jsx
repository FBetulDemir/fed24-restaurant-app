//3.  och även en lägg till/ta bort funktion, med en counter därtill.
import setState, { useState } from "react";

function ButtonClickUp() {
  let count = useState;
  const handleClick = () => (
    (count = +1), console.log("Du har tryckt på Lägg till")
  );
  return <button onClick={handleClick}>LÄGG TILL</button>;
}
function ButtonClickDown() {
  let count = useState;
  const handleClick2 = () => (
    (count = -1), console.log("Du har klickat ta bort")
  );
  return <button onClick={handleClick2}>TA BORT</button>;
}

function CounterDisplay() {
 
  return (

}

export { ButtonClickUp, ButtonClickDown, CounterDisplay };
