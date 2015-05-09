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


  componentDidMount: function(){
    AppStateActions.setTitle('聚吧');
    $.get('http://www.xuntayizhan.com/api/juba_detail/?search=' + this.props.routeParams.get("slug"), function(data) {
      var juba = data.results[0];
      AppStateActions.setTitle(juba.title);
      this.setState({
        juba: juba
      });
    }.bind(this));
  },

  render: function() {
    return (
        <div>
          <p>
            <div dangerouslySetInnerHTML={{__html: this.state.juba.content }} />
          </p>
        </div>
    );
  }
});