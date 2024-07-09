import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinnerr from './Spinnerr';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    catagory: "general"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    catagory: PropTypes.string
  }
  capatalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capatalize(this.props.catagory)}-TSP`;
  }
  async componentDidMount() {
    this.setState({ loading: true })
    this.props.setProgress(10);
    let url = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`);
    this.props.setProgress(40);
    let data = await url.json();
    this.props.setProgress(70);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  // handlePreviousPage= async()=>{
  //   this.setState({loading:true})
  //   let url= await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`);
  //   let data= await url.json();
  //   this.setState({articles:data.articles,
  //     page:this.state.page-1,
  //     loading:false})
  // }
  // handleNextPage=async()=>{
  //   if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

  //   }
  //     else{
  //     this.setState({loading:true})
  //     let url= await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
  //     let data= await url.json();
  //     this.setState({articles:data.articles,
  //       page:this.state.page+1,
  //       loading:false
  //     })
  //   }
  // }
  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 });
    // this.setState({ loading: true });
    let url = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`);
    let data = await url.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      page: this.state.page + 1,
      totalResults: data.totalResults
    })
  };
  render() {
    return (
      <>
        <h1 className='text-center' style={{ margin: "90px 0 35px 0", color: this.props.mode === 'dark' ? 'white' : 'black' }}>{`TSP - Top ${this.capatalize(this.props.catagory)} Headlines`}</h1>
        {this.state.loading&&<Spinnerr mode={this.props.mode}/>}
        <InfiniteScroll
          style={{ overflowY: 'hidden' }}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinnerr mode={this.props.mode}/>}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => { 
                return <div className='col-md-4' key={element?.url}>
                  <NewsItems title={element.title? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage}
                    newsURL={element.url} author={element.author} date={element.publishedAt} mode={this.props.mode}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1} className={`btn btn-${this.props.mode==="dark"?"secondary":"primary"}`} onClick={this.handlePreviousPage}>&#8592; Previous</button>
          <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className={`btn btn-${this.props.mode==="dark"?"secondary":"primary"}`} onClick={this.handleNextPage}>Next  &#8594;</button>
          </div> */}
      </>
    )
  }
}
export default News