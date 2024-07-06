import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes , Route  } from 'react-router-dom';
export default class App extends Component {
  pageSize=9;

  constructor(props){
    super(props);
    this.state={
      mode:"light"}
      // document.title=`${this.props.catagory}-TSP`
  }

  toggleMode = () => {
    this.setState((prevState) => ({
      mode: prevState.mode === "light" ? "dark" : "light"
    }));
    document.body.style.backgroundColor = this.state.mode === "light" ? "#000000": "white";
  };

  render() {
    return (      
        <div>
          <BrowserRouter>
         <Navbar mode={this.state.mode} tm={this.toggleMode}/> 
         <Routes>
          <Route exact path='/' element={<News mode={this.state.mode}key='home' pageSize={this.pageSize} catagory="general"/>}/>
          <Route exact path='/business' element={<News mode={this.state.mode}key='business' pageSize={this.pageSize} catagory="business"/>}/>
          <Route exact path='/entertainment' element={<News mode={this.state.mode}pageSize={this.pageSize} key='entertainment' catagory="entertainment"/>}/>
          <Route exact path='/health' element={<News mode={this.state.mode}key='health' pageSize={this.pageSize} catagory="health"/>}/>
          <Route exact path='/science' element={<News mode={this.state.mode}key='science' pageSize={this.pageSize} catagory="science"/>}/>
          <Route exact path='/sports' element={<News mode={this.state.mode}key='sports' pageSize={this.pageSize} catagory="sports"/>}/>
          <Route exact path='/technology' element={<News mode={this.state.mode}key='technology' pageSize={this.pageSize} catagory="technology"/>}/>
         </Routes>
         </BrowserRouter>
        </div>
    )
  }
}
