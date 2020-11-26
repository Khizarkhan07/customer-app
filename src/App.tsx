import React, { unstable_Profiler as Profiler} from "react";
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps} from 'react-router-dom';
import EditCustomer from "./pages/customer/EditCustomer";
import Sales from "./pages/sales/Sales";
import Navbar from "./pages/Navbar";
import {callback} from "./utils";
import HomePage from "./pages/HomePage";
const App: React.FC<RouteComponentProps<any>>  = () => {
   
    return (
      <div>
          <Profiler id="Header" onRender={callback}>
              <Navbar/>
          </Profiler>



            <Switch>
                <Profiler id="routes" onRender={callback}>
                <Route path={'/sales'} exact component={Sales} />
                
                <Route path={'/'} exact component={HomePage} />
                
                <Route path={'/edit/:id'} exact component={EditCustomer} />

                </Profiler>
            </Switch>
      </div>
    );
  }


export default withRouter(App);
