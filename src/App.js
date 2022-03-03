import { Route, Switch, Redirect } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./components/layout/Layout";
import AllQuotes from "./components/Pages/AllQuotes";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./components/Pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./components/Pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./components/Pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes"></Redirect>
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes></AllQuotes>
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail></QuoteDetail>
          </Route>
          <Route path="/new-quote">
            <NewQuote></NewQuote>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
