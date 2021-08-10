import React, { Component } from 'react';
import {StyleSheet,Text,View,TextInput} from 'react-native';
import {Header} from 'react-native-elements';
import db from '.database.js';

export default class Homescreen extends React.Component() {
  constructor(){
    super();
    this.state({
      text : '',  
    })
  }  

  getWord=(word)=>{
    var searchKeyWord = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json" + searchKeyWord + ".json"

    return fetch(url)
    .then((data)=>{
      if(data.status === 200){
        return data.json();
      }
      else {
        return null
      }
    })
    .then((response)=>{
      var responseObject = response

      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype

        this.setState({
          "word" : this.state.text,
          "definition" : definition,
          "lexicalCategory" : lexicalCategory,
        })
      }

      else {
        this.setState({
          "word" : this.state.text,
          "definition" : "Not Found !",
        })
      }
    })
  }

  render(){
    return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text=>{
                this.setState({
                    text : text,
                    isSearchPressed : false,
                    word : 'Loading....',
                    lexicalCategory : '',
                    examples : [],
                    definition : ""
                });
            }}
            value = {this.state.text}
          ></TextInput>

        <TouchableOpacity
            style = {styles1.button}
            onPress={()=>{
                this.setState({isSearchPressed : true});
                this.getWord(this.state.text)
            }}
        >
            <Text style = {styles1.buttonText}>GO</Text>
        </TouchableOpacity>

        <View>
          <Text>
            Word : {""}
          </Text>
          <Text style={{fontSize : 18}}>
            {this.state.word}
          </Text>
        </View>

        <View>
          <Text>
            Type : {""}
          </Text>
          <Text style={{fontSize : 18}}>
            {this.state.lexicalCategory}
          </Text>
        </View>

        <View style={{flexDirection : 'row', flexWrap : 'wrap'}}>
            <Text>
              Definition : {""}
            </Text>
            <Text style={{fontSize : 18}}>
              {this.state.definition}
            </Text>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    button : {
        marginTop: 20,
        marginLeft: 170,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});