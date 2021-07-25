import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/hoc/Layout/Layout";
import CurrencyExchange from "./components/pages/CurrencyExchange/CurrencyExchange";
import ExchangeRates from "./components/pages/ExchangeRates/ExchangeRates";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/currency_exchange" component={CurrencyExchange} />
      <Route path="/exchange_rates" component={ExchangeRates} />
      <Redirect to="/currency_exchange" />
    </Switch>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
