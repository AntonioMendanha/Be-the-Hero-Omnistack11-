import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/logon';
import register from './pages/register';
import profile from './pages/profile';
import newincident from './pages/newincident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={register} />

                <Route path='/profile' component={profile} />
                <Route path='/incidents/new' component={newincident} />
            </Switch>
        </BrowserRouter>
    );
}