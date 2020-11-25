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


          <Profiler id="Homepage" onRender={callback}>
            <Switch>
                <Route path={'/sales'} exact component={Sales} />
                
                <Route path={'/'} exact component={HomePage} />
                
                <Route path={'/edit/:id'} exact component={EditCustomer} />
            </Switch>
          </Profiler>
      </div>
    );
  }


export default withRouter(App);
