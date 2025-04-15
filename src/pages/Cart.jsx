import './cart.css'

//1. Skapa grupper/arrays eventuellt

const Cart = () =>{
	return (
		<main>
			<header></header>
	<h1 id = "your-order">Din Beställning</h1>
<section className = "box">
<div id = "produkt1">
	<h2 id = "title">Sushi 1</h2>
	<div className = "desPic">
	<img id = "pics" src="-" alt="Bild på sushi" />
	<p id = "description"> {"beskrivning"} </p>
	</div>
	<div className = "btns">
	<button id = "addBtn">LÄGG TILL</button>
	<div id = "counter">0</div>
	<button id = "subBtn">TA BORT</button>
	</div>
</div>
</section>


<section id = "priceOrder">

	<div className = "prices">
	<div id = "price-numbers">{"PRIS EX MOMS"} KR</div>
	<p> 25% {"moms-priset"}</p>
	<div id = "totalPrice">Totalt: {"PRIS INK MOMS"} KR</div>
	</div>

	<div className = "orderNr">
		<p id = "numbers"> ORDERNUMMER# {123456}</p>
		<button id = "cancelOrdBtn"> ÅNGRA </button>
	</div>


</section>


	<button id = "processBtn">GÅ VIDARE</button>
<footer></footer>
</main>
	)
}

//2. Fånga upp de genom classname


//4. Skapa en function för lägg till/ta bort och koppla samman den med räknaren

//5. Se till att varan i sig kan försvinna helt om man tar bort från 1 till 0 - anpassa sidan därefter

//6. Alla priserna på varorna skall slås ihop till ett totalpris + moms på 25%

//7. Du ska kunna få ett unikt order nummer och även kunna ångra hela beställningen om du så önskar med en ångra knapp.

//8. Du ska, efter att du fyllt i vad du vill ha och hur mycket du vill ha av det - gå vidare till nästa flik.

//9. Ordernummer och totalpris skall fortfarande synas - du skall kunna välja i en radio-meny mellan betalsätt som Klarna, Mastercard eller kort.

//10. Ett formulär som skall fyllas i både för och efternamn, adressnamn, postnummer och ort och telefonnummer.

//11. Informationen skall kunna lagras vidare, du skall även kunna gå tillbaka till förra sidan(fliken) om du så önskar - det skall finnas en knapp för "beställ nu" som leder vidare till sista sidan.

//12. Sista sidan skall du kunna se ditt ordernummer (ingen ångra knapp), vad du har valt för betalningssätt, totalpris och sedan två rutor där under där den ene ger dig en QR kod till kvittot - "tack för din beställning" och under den en ruta som räknar ner tid från ca 10 minuter, ge den ett random-spann mellan 15-10 minuter ish borde räcka.

export default Cart