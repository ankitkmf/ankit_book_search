import React from 'react';
import axios from "axios";
const apiKey ='sYkovQcCNOGAnLuiCTEZrQ';

export default {
    allRecords: async searchText=>{      
        const response = 
        await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchText}`);      
        return response.data;
    },

    singleRecord: async id=>{      
        const response = 
        await axios.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/show/${id}?key=${apiKey}`);      
        return response.data;
    }
  };