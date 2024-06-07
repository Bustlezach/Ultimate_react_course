function Footer() {
  const date = new Date();
  const hour = date.getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We are currently open until {closeHour}:00. Come visit us or order
            online.
          </p>
        </div>
      ) : (
        <div className="order">
          <p>
            We are happy to welcome you between {openHour}:00 and {closeHour}:00
          </p>
        </div>
      )}
      <button className="btn">Order me</button>
    </footer>
  );
}

export default Footer;
