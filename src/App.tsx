import React, { unstable_Profiler as Profiler} from "react";
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import EditCustomer from "./pages/customer/EditCustomer";
import Sales from "./pages/sales/Sales";
import Navbar from "./pages/Navbar";
import {callback} from "./utils";

const App: React.FC<RouteComponentProps<any>>  = () => {
   
    return (
      <div>
          <Profiler id="Header" onRender={callback}>
              <Navbar/>
          </Profiler>


          <Switch>
              <Route path={'/sales'} exact component={Sales} />
              <Profiler id="Homepage" onRender={callback}>
              <Route path={'/'} exact component={HomePage} />
              </Profiler>
              <Route path={'/edit/:id'} exact component={EditCustomer} />
          </Switch>

      </div>
    );
  }


export default withRouter(App);
