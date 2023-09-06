import React, {  useState, useEffect } from 'react';
import CardList from '../components/CardList';
//import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

// App renders
function App () { // smart components have class syntax and have state

    // App creates initial state
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)

    // App runs use effect
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')  
        .then(response=> response.json())
        .then(users=> {setRobots(users)}); 
        console.log(count)
    }, [count]) // Only run useeffect initially - do not run infinitely unless variable specified
    // if variable specified run useeffect if it changes

    const onSearchChange = (event) =>{  
        setSearchfield(event.target.value)                     
    }

    // Robots get new set and sets app to re-render
    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    console.log(robots,searchfield)
    return !robots.length ? // if robots arent loaded, return loading, else return structure
        <h1>Loading</h1> :        
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={() => setCount(count+1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }   

export default App;