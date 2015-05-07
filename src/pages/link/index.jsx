/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;

var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      juba: {}
    };
  },

  getStateFromStores: function(){

  },

  componentDidMount: function(){
    AppStateActions.setTitle(__('nav.link'));
    $.get('http://www.xuntayizhan.com/api/link_list/', function(date) {
      var link_component = [];
      $.each(date.results, function(index, post){
        post.url = "#link/" + post.slug;
        link_component.push((
            <UI.ListItem>
              <a href={post.url}>{post.title}</a>
            </UI.ListItem>
        ));
      });
      this.setState({
        link: link_component
      });
    }.bind(this));
  },

  onDataChange: function(field){

  },

  save: function(){

  },

  render: function() {
    return (
        <UI.ListContainer>
          {this.state.link}
        </UI.ListContainer>
    );
  }
});