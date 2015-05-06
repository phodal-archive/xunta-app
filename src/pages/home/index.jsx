/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;
var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  componentWillMount: function(){
  },
  
  componentDidMount: function(){
    AppStateActions.setTitle(__('app.name'));
  },

  render: function(){

    return (
        <IScroll>
          <UI.Icon name="like" style={{fontSize: '220px', color: 'red', textShadow:'3px 3px 5px #464646'}} />
        </IScroll>
    );
  }

});