import React from "react";
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import EditCustomer from "./pages/customer/EditCustomer";
import CreateCustomer from "./pages/customer/CreateCustomer";
import CreateSale from "./pages/sales/CreateSale";
import Sales from "./pages/sales/Sales";
import Navbar from "./pages/Navbar";
const App: React.FC<RouteComponentProps<any>>  = () => {
   
    return (
      <div>
        
        <Navbar/>
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Route path={'/sales'} exact component={Sales} />
          <Route path={'/create/customer'} exact component={CreateCustomer} />
          <Route path={'/create/sale'} exact component={CreateSale} />
          <Route path={'/create'} exact component={CreateCustomer} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />

        </Switch>
      </div>
    );
  }


export default withRouter(App);
