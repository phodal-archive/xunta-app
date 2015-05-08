/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;

var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      blog: {}
    };
  },

  getStateFromStores: function(){

  },

  componentDidMount: function(){
    AppStateActions.setTitle(__('nav.blog'));
    $.get('http://www.xuntayizhan.com/api/blog_list/', function(date) {
      var blog_component = [];
      $.each(date.results, function(index, post){
        post.url = "#juba/" + post.slug;
        blog_component.push((
            <UI.ListItem>
              <a href={post.url}>{post.title}</a>
            </UI.ListItem>
        ));
      });
      this.setState({
        blog: blog_component
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
          {this.state.blog}
        </UI.ListContainer>
    );
  }
});