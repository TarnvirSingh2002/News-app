import React, { Component } from 'react'

export default class Spinnerr extends Component {
  render() {
    return (
      <div>
        <div className="text-center my-3">
            <div className={`spinner-border text-${this.props.mode==="dark"?"white":"black"} my-3`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
      </div>
          
    )
  }
}
