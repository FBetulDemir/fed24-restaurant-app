//3. Det skall finnas en bild på rätten, en snabb beskrivning av vad som finns i den (alltså ingredienser) och även en lägg till/ta bort funktion med en counter därtill.

import React, { useState } from "react";

function WareManager() {
  const [wares, setWares] = useState([
    { id: 1, name: "-", quantity: 0 },
    { id: 2, name: "-", quantity: 0 },
  ]);

  const addWare = (id) => {
    setWares((prev) =>
      prev.map((ware) =>
        ware.id === id ? { ...ware, quantity: ware.quantity + 1 } : ware
      )
    );
  };

  const removeWare = (id) => {
    setWares((prev) =>
      prev.map((ware) =>
        ware.id === id && ware.quantity > 0
          ? { ...ware, quantity: ware.quantity - 1 }
          : ware
      )
    );
  };




