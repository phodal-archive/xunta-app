  /** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;

var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  getStateFromStores: function(){

  },

  componentDidMount: function(){
    AppStateActions.setTitle(__('nav.blog'));
  },

  onDataChange: function(field){

  },

  save: function(){

  },

  render: function() {
    return (
      <div>
        <IScroll>
          <h1>Blog</h1>
        </IScroll>
      </div>
      );
  }
});