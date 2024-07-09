import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes , Route  } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pageSize=9;
  apiKey=process.env.REACT_APP_NEWS_API
  constructor(props){
    super(props);
    this.state={
      mode:"light",
      progress:0,
     }
  }

  setProgress=(progress)=>{
    this.setState({progress: progress});
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
         <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
         <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='home' pageSize={this.pageSize} catagory="general"/>}/>
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='business' pageSize={this.pageSize} catagory="business"/>}/>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}pageSize={this.pageSize} key='entertainment' catagory="entertainment"/>}/>
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='health' pageSize={this.pageSize} catagory="health"/>}/>
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='science' pageSize={this.pageSize} catagory="science"/>}/>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='sports' pageSize={this.pageSize} catagory="sports"/>}/>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} mode={this.state.mode}key='technology' pageSize={this.pageSize} catagory="technology"/>}/>
         </Routes>
         </BrowserRouter>
        </div>
    )
  }
}
