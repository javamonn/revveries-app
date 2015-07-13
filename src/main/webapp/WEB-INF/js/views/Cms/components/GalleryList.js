import React from 'react';
import Immutable  from 'immutable';
import mui from 'material-ui';

const List = mui.List;
const ListItem = mui.ListItem;

var GalleryList = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin
  ],

  propTypes: {
    galleries: React.PropTypes.instanceOf(Immutable.List).isRequired
  },

  render() {

    var listItems = this.props.galleries.map(gallery => {
      return <ListItem primaryText={gallery.name} />
    });

    return (
      <List>
        {listItems} 
      </List>
    )
  }
});

module.exports = GalleryList;
