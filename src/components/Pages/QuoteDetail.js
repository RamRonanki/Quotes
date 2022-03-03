import { Fragment, useEffect } from "react";
import { Link, Route, useParams } from "react-router-dom";

import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';
import LoadingSpinner from "../UI/LoadingSpinner";



const QuoteDetail = (props) => {
  const params = useParams();
  const {quoteId} = params;
  console.log(params.quoteId);
  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if(error){
    return <p className='centered focused'>{error}</p>
  }

  if(status === 'completed' && (!loadedQuote || loadedQuote.length === 0)){
    <NoQuotesFound/>
  }

  const quote = loadedQuote;
  
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path="/quotes/:quoteId/comments">
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
