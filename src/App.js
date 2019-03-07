import React, { Component } from 'react';
import ToDos from './component/ToDos';
import Header from './component/layout/Header';
import './App.css';
import AddTodo from './component/AddTodo';
import uuid from 'uuid';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import About from './component/pages/About';
import axios from 'axios';

 

class App extends Component {
  state = {
    todos:[
      //this is going load from https://jsonplaceholder.typicode.com/todos
      /*{
        id: 1,
        title: 'take out trash',
        completed: false
      },
      {
        id: 2,
        title: 'take out wife',
        completed: true
      },
      {
        id: 3,
        title: 'take out car',
        completed: false
      },
      {
        id: 4,
        title: 'take out cat',
        completed: false
      },
      {
        id: 5,
        title: 'take out dog',
        completed: false
      },
      {
        id: 6,
        title: 'dinner with wife',
        completed: false
      }*/
    ]
  }

//lifecycle method
componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data }))
}

// toggle complete
  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map (todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })} );
    console.log(id);
  }

//delTodo
  delTodo = (id) => {
    //this is spread operater 
    /*this.setState({todos:[...this.state.todos.filter(todo => todo.id
      !== id)]});*/

    //use with axios 
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({todos:[...this.state.todos.filter(todo => todo.id
    !== id)]}));
  }

  //addTodo
  addTodo = (title) => {
    /*const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    }*/

    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    }).then(res => this.setState({todos: [...this.state.todos,res.data]}));
    //this.setState({todos: [...this.state.todos,newTodo]})
  }

  render() {
    console.log(this.state.todos);
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path = "/" render={props => (
            <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <ToDos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
            </React.Fragment>)}>
          </Route>
          <Route path = "/about" component={About}/>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
