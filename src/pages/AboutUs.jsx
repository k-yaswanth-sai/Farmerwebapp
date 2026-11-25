export default function AboutUs() {
  return (
    <div className="page about-page">
      <section className="about-intro">
        <p className="about-eyebrow">ABOUT FARMERFRIENDLY</p>
        <h1>Bringing farms and families closer</h1>
        <p>
          FarmerFriendly is an online marketplace that helps farmers share their produce
          directly with buyers. We make it easier to discover farm products, compare
          prices, and keep track of orders in one place.
        </p>
      </section>

      <section className="about-section">
        <h2>Our mission</h2>
        <p>
          We aim to make the farm-to-buyer journey more direct and transparent. By
          helping farmers showcase what they have available and giving buyers a simple
          way to browse and order, we support better connections between the people who
          grow food and the people who enjoy it.
        </p>
      </section>

      <section className="about-section">
        <h2>How FarmerFriendly works</h2>
        <div className="about-cards">
          <article className="about-card">
            <h3>For farmers</h3>
            <p>
              Add products with their price, quantity, and details. Use the dashboard
              to manage listings, follow sales, and view market trends.
            </p>
          </article>
          <article className="about-card">
            <h3>For buyers</h3>
            <p>
              Browse and search available products, check prices and stock, place
              orders, and review your order history.
            </p>
          </article>
        </div>
      </section>

      <section className="about-section about-values">
        <h2>What matters to us</h2>
        <ul>
          <li><b>Direct connections:</b> Make it easier for farmers and buyers to find one another.</li>
          <li><b>Clear information:</b> Show product details, pricing, and availability upfront.</li>
          <li><b>Simple tools:</b> Keep browsing, listing, and order tracking straightforward.</li>
        </ul>
      </section>
    </div>
  );
}
