import React, { Component } from "react";
import AllResults from "./components/AllResults";
import SingleResult from "./components/SingleResult";
import FacebookLoading from 'react-facebook-loading';
import Axios from "./services/Axios";
import 'react-facebook-loading/dist/react-facebook-loading.css';

const apiKey ='sYkovQcCNOGAnLuiCTEZrQ';// Create .env file and store in environment variable

class App extends Component {
  state = {
    searchText: "",
    error: "",
    fetchingData: false,
    searchResults: [],
    singleResult: [],  
    showAllData:true
  };

  onTextChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };

  onSearchBookClick=()=>{   
    this.fetchAllRecords("");
  }  

  fetchAllRecords = async test => {
    this.setState({ fetchingData: true });
    const { searchText } = this.state;
    try {
    
      const result= await  Axios.allRecords(searchText);     
      this.parseXMLResponse(result);
    
    }
    catch (error) {
      this.setState({
        error: error.toString(),
        fetchingData: false
      });
    }
    this.setState({ showAllData: true });
  }; 

  getSingleBook=id=>{
    this.fetchSingleRecord(id);   
  }

  fetchSingleRecord = async id => {
    try {
      this.setState({ fetchingData: true });
      const result = await Axios.singleRecord(id);
      this.setState({ showAllData: false });
      this.parseXMLResponse(result);
    }
    catch (error) {
      this.setState({
        error: error.toString(),
        fetchingData: false
      });
    }
  }

  resetView=()=>{
    this.setState({showAllData: true });
  }

  parseXMLResponse = response => {
    const parser = new DOMParser();
    const XMLResponse = parser.parseFromString(response, "application/xml");
    const parseError = XMLResponse.getElementsByTagName("parsererror");

    if (parseError.length) {
      this.setState({
        error: "There was an error fetching results.",
        fetchingData: false
      });
    } else {
     
      if (this.state.showAllData)
      {
      
        const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
        const searchResults = XMLresults.map(result => this.XMLToJson(result));
        this.setState({ searchResults, fetchingData: false });
      }
      else
      {
       
        const XMLresults = new Array(...XMLResponse.getElementsByTagName("book"));
        const searchResults = XMLresults.map(result => this.XMLToJson(result));
        this.setState({ singleResult: searchResults, fetchingData: false });
      }
    }
  };

  XMLToJson = XML => {
    const allNodes = new Array(...XML.children);
    const jsonResult = {};
    allNodes.forEach(node => {
      if (node.children.length) {
        jsonResult[node.nodeName] = this.XMLToJson(node);
      } else {
        jsonResult[node.nodeName] = node.innerHTML;
      }
    });
    return jsonResult;
  };

  render() {
    return (
      <div className="container">
        <div className="header clearfix mt-5">
          <h3 className="text-muted">Ankit Book Search</h3>
        </div>
        <div className="jumbotron">
          <div className="form-group row">
            <input
              className="mr-1 col-sm-9 form-control"
              type="text"
              placeholder="Search Books By title, author"
              name="searchText"
              onChange={this.onTextChange}
              value={this.state.searchText}
            />
            <button
              className="col-sm-2 btn btn-primary search"
              onClick={this.onSearchBookClick}
            >
              Search
            </button>
          </div>

          {this.state.fetchingData ? (           
            <FacebookLoading
              delay={0}
              duration={800}
              zoom={4}
              style={{ margin: '0 auto' }}
            />
          ) : (
              (this.state.error && (
                <p className="text-danger">{this.state.error}</p>
              )) || 
              
              (this.state.showAllData ? 
                <AllResults books={this.state.searchResults} getSingleBook={this.getSingleBook.bind(this)}/>
                :  <SingleResult books={this.state.singleResult} resetView={this.resetView.bind(this)}/>
              )
            )}
        </div>
      </div>
    );
  }
}

export default App;
