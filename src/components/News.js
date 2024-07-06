import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinnerr from './Spinnerr';
import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    pageSize:6,
    catagory:"general"
  }
  static propTypes={
    pageSize:PropTypes.number,
    catagory:PropTypes.string
  }
constructor(){
  super();
  this.state={
    articles:[],
    loading:false,
    page:1
  }
}
async componentDidMount(){
  this.setState({loading:true})
  let url= await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=c58cb95745ca4eb5b7aceaaccc5b4e53&page=1&pageSize=${this.props.pageSize}`);
  let data= await url.json();
  this.setState({articles:data.articles, 
    totalResults:data.totalResults,
    loading:false})
}
handlePreviousPage= async()=>{
  this.setState({loading:true})
  let url= await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=c58cb95745ca4eb5b7aceaaccc5b4e53&page=${this.state.page-1}&pageSize=${this.props.pageSize}`);
  let data= await url.json();
  this.setState({articles:data.articles,
    page:this.state.page-1,
    loading:false})
}
handleNextPage=async()=>{
  if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

  }
    else{
    this.setState({loading:true})
    let url= await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=c58cb95745ca4eb5b7aceaaccc5b4e53&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
    let data= await url.json();
    this.setState({articles:data.articles,
      page:this.state.page+1,
      loading:false
    })
  }
}
  render() {
    return (
        <div className='container my-3'>
          <h1 className='text-center' style={{margin:"35px 0"}}>Top-head lines of News</h1>
          {this.state.loading&&<Spinnerr/>}
          <div className='row'>
            {this.state.articles.map((element)=>{
            return<div className='col-md-4' key={element.url}>
              <NewsItems title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage}
              newsURL={element.url} author={element.author} date={element.publishedAt}/>
            </div>
            })}
          </div>
          <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1}className="btn btn-primary " onClick={this.handlePreviousPage}>&#8592; Previous</button>
          <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}className="btn btn-primary " onClick={this.handleNextPage}>Next  &#8594;</button>
          </div>
        </div> 
    )
  }
}
export default News
