import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Users from './Users/Users';
import Meals from './Meals/Meals';
import Trainings from './Trainings/Trainings';
import DailyActivities from './DailyActivities/DailyActivities';
import Reports from './Reports';

export default class Header extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <header>
                        <nav>
                            <ul className="navbar">
                                <li><Link to='/'>Główna</Link></li>
                                <li><Link to='/users'>Użytkownicy</Link></li>
                                <li><Link to='/meals'>Posiłki</Link></li>
                                <li><Link to='/trainings'>Treningi</Link></li>
                                <li><Link to='/dailyActivities'>Aktywności</Link></li>
                                <li><Link to='/reports'>Raporty</Link></li>
                            </ul>
                        </nav>
                    </header>
                    <Route exact path='/' component={Home} />
                    <Route path='/users' component={Users} />
                    <Route path='/meals' component={Meals} />
                    <Route path='/trainings' component={Trainings} />
                    <Route path='/dailyActivities' component={DailyActivities} />
                    <Route path='/reports' component={Reports} />
                </div>
            </Router>
        )
    }
}