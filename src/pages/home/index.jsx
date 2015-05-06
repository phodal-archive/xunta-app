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
      this.setState({
        blog: blog,
        juba: juba,
        link: link
      });
    }.bind(this));
  },

  render: function(){
    return (
        <IScroll>
          {this.state.blog}
          {this.state.juba}
          {this.state.link}
        </IScroll>
    );
  }

});