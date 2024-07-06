import React, { Component } from 'react'
export default class NewsItems extends Component { 
  render() {
    let {title,description,imageUrl, newsURL, author, date}=this.props
    return (
      <div className='my-3'>
        <div className="card " style={{border:"none"}}>
            <img src={imageUrl?imageUrl:"https://media.timeout.com/images/101657513/image.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body" style={{backgroundColor:this.props.mode==="dark"?"#343a40":"white", color:this.props.mode==="dark"?"white":"black"}}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-grey'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                <a href={newsURL} target='__main' className={`btn btn-sn btn-${this.props.mode==="dark"?"dark":"primary"}`}>Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
