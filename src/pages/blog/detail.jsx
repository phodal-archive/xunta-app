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


  componentDidMount: function(){
    AppStateActions.setTitle('Blog Detail');
    $.get('http://www.xuntayizhan.com/api/blog_detail/?search=' + this.props.routeParams.get("slug"), function(data) {
      var blog = data.results[0];
      AppStateActions.setTitle(blog.title);
      this.setState({
        blog: blog
      });
    }.bind(this));
  },

  render: function() {
    return (
        <div>
          <p>
            <div dangerouslySetInnerHTML={{__html: this.state.blog.content }} />
          </p>
        </div>
    );
  }
});