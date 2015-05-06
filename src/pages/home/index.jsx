/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;
var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');
var $ = require('jquery');
var _ = require('lodash-node');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      blog: {},
      juba: {},
      link: {}
    };
  },

  componentWillMount: function(){
  },
  
  componentDidMount: function(){
    AppStateActions.setTitle(__('app.name'));
    $.get('http://www.xuntayizhan.com/api/all/', function(date) {
      var blog = _.where(date, { 'model': 'blog' });
      var juba = _.where(date, { 'model': 'juba' });
      var link = _.where(date, { 'model': 'link' });
      var blog_component = [];
      var juba_component = [];
      var link_component = [];
      $.each(blog, function(index, post){
        blog_component.push((
            <UI.ListItem>
              <a href="#blog/{post.slug}">{post.title}</a>
            </UI.ListItem>
        ));
      });
      $.each(juba, function(index, post){
        juba_component.push((
            <UI.ListItem>
              <a href="#blog/{post.slug}">{post.title}</a>
            </UI.ListItem>
        ));
      });
      $.each(link, function(index, post){
        link_component.push((
            <UI.ListItem>
              <a href="#blog/{post.slug}">{post.title}</a>
            </UI.ListItem>
        ));
      });
      this.setState({
        blog: blog_component,
        juba: juba_component,
        link: link_component
      });
    }.bind(this));
  },

  render: function(){
    return (
          <UI.ListContainer>
            {this.state.blog}
            {this.state.juba}
            {this.state.link}
          </UI.ListContainer>
    );
  }

});