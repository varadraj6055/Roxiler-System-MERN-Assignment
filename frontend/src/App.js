import Footer from "./component/Footer";
import Header from "./component/Header";
import ProductScreen from "./screen/ProductScreen";
import { Container } from "react-bootstrap";
import ProductsStatsScreen from "./screen/ProductsStatsScreen";
import ProductBarChartScreen from "./screen/ProductBarChartScreen";

function App() {
  return (
    <>
    <Header />
      <main>
        <Container>
          <ProductScreen />
          <hr />
          <ProductsStatsScreen />
          <hr />
          <ProductBarChartScreen />
          <hr />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
