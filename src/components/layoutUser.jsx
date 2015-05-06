/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._;
var UI = require('react-topui');
var Snap = require('./snaplayout');
var IScroll = require('./iscroll');

var AppStateStore = require('../flux/stores/appState');

module.exports = React.createClass({

  mixins: [ AppStateStore.mixin() ],

  getStateFromStores: function(){
    return {
      pageTitle: AppStateStore.get('title'),
      showBackButton: AppStateStore.get('showBackButton')
    }
  },

  render: function() {
    return(
      <Snap.Layout>
        <Snap.Drawers>
          
          <Snap.Left>
            <UI.List >
              <UI.ListHeader>
                寻找你的ta
              </UI.ListHeader>
              <UI.ListContainer className="nav-list">
                <UI.ListItem>
                  <a href="#dashboard">{__('nav.home')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#blog">{__('nav.blog')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#juba">{__('nav.juba')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#link">{__('nav.link')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#settings">{__('nav.settings')}</a>
                </UI.ListItem>
              </UI.ListContainer>
            </UI.List>
          </Snap.Left>
        </Snap.Drawers>
        
        <Snap.Content>
          <UI.NavBar>
            <UI.NavBarItem left quarter>
              <Snap.Toggler side="left">
              <UI.Icon name="listview" className="nav-bar-icon" />
              </Snap.Toggler>
            </UI.NavBarItem>
            <UI.NavBarItem center half>
              {this.state.pageTitle}
            </UI.NavBarItem>
          </UI.NavBar>

          <div>
            {this.props.children}
          </div>

        </Snap.Content>

      </Snap.Layout>
    );
  },

  renderBackButton: function(){
    if( !this.state.showBackButton ){
      return;
    }
    return (
      <UI.Icon name="back" onClick={this.props.back} style={{margin: '0 20px'}}  className='nav-bar-icon' />
    );
  }
  
});