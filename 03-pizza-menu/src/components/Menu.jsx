import { Fragment } from "react";
import { pizzaData } from "../data";

const pizzas = pizzaData ?? [];

function Menu() {
  const pizzaList = pizzas.map((p) => (
    <div className={`pizza ${p.soldOut? 'sold-out' : null}`} key={p.name}>
      <img src={p.photoName} alt={p.name} />
      <li>
        <h3>{p.name}</h3>
        <p>{p.ingredients}</p>
        <span>{p.soldOut ? "SOLD OUT" : p.price}</span>
      </li>
    </div>
  ));
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {pizzaList.length > 0 ? (
        <Fragment>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">{pizzaList}</ul>
        </Fragment>
      ) : (
        <p>We are still working on our menu. Please, come back later</p>
      )}
    </main>
  );
}

export default Menu;
