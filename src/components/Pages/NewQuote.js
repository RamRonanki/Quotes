import { useHistory } from "react-router-dom";

import QuoteForm from "../quotes/QuoteForm";
import useHttp from '../../hooks/use-http';
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

const NewQuote = () =>{
    const history = useHistory();
    const {sendRequest,status} = useHttp(addQuote);
    useEffect(()=>{
        if(status === 'completed'){
            history.push('/quotes')
        }
    },[status,history]);

     const onAddQuoteHandler = dataToAdd =>{
         console.log(dataToAdd)
         sendRequest(dataToAdd);
     }
    return <QuoteForm isLoading={status ==='pending'} onAddQuote={onAddQuoteHandler}/>;
}

export default NewQuote;