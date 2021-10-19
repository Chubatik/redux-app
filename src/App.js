import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {addCashAction, getCashAction} from "./store/cashReducer";
import {fetchCustomers} from "./asyncAction/customers";

const App = () => {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash);
    const customers = useSelector(state => state.customers.customers);

    const addCash = (amount) => {
        dispatch(addCashAction(amount));
    }

    const getCash = (amount) => {
        dispatch(getCashAction(amount));
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer));
    }

    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id));
    }

    const addManyCustomers = () => {
        dispatch(fetchCustomers());
    }
    return (
        <div>
            <div>{cash}</div>
            <button onClick={() => addCash(Number(prompt()))}>replenish</button>
            <button onClick={() => getCash(Number(prompt()))}>withdraw</button>
            <button onClick={() => addCustomer(prompt())}>add customer</button>
            <button onClick={() => addManyCustomers()}>get customers from db</button>
            <div>{
                customers.length > 0 ?
                    <div>
                        {customers.map(e =>
                            <p key={e.id.toString()} onClick={() => removeCustomer(e)}>{e.name}</p>
                        )}
                    </div>
                    :
                    <div>No clients</div>
            }</div>
        </div>
    )
}

export default App;
