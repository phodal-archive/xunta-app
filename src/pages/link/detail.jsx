/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._;

var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      link: {}
    };
  },


  componentDidMount: function(){
    AppStateActions.setTitle('荐吧');
    $.get('http://www.xuntayizhan.com/api/link_detail/?search=' + this.props.routeParams.get("slug"), function(data) {
      var link = data.results[0];
      AppStateActions.setTitle(link.title);
      this.setState({
        link: link
      });
    }.bind(this));
  },

  render: function() {
    return (
        <div>
          <p>
            <div dangerouslySetInnerHTML={{__html: this.state.link.description }} />
          </p>
        </div>
    );
  }
});