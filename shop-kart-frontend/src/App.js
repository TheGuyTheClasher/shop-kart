import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href="/">shopkart</a>
      </header>
      <main>
        <h1>Featured products</h1>
        <div className="products">
          {
            data.products.map((product) => (
              <div className="product" key={product.slug}>
                <img src={product.image} alt={product.name} />
                <div className="productInfo">
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}

export default App;
