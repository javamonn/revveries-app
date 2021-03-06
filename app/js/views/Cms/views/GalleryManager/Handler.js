import React from 'react';
import Immutable  from 'immutable';
import Reflux from 'reflux';
import GalleryCreator from './components/GalleryCreator';
import GalleryCard from './components/GalleryCard';
import CmsStore from 'stores/CmsStore';
import DeleteConfirmationDialog from './components/delete-confirmation-dialog'
import GalleryDialog from './components/gallery-dialog'
import CmsActions from 'actions/CmsActions';

var GalleryManager = React.createClass({

  mixins: [
    require('react/addons').addons.PureRenderMixin,
    Reflux.listenTo(CmsStore, 'onGalleriesChanged')
  ],

  componentDidMount() {
    CmsStore.getInitialState().then(galleries => {
      if (this.isMounted()) {
        this.setState({galleries});
      }
    });
  },

  getInitialState() {
    return {
      galleries: Immutable.List([])
    };
  },

  onGalleriesChanged(galleries) {
    this.setState({galleries});
  },

  displayDialog(context, gallery) {
    this.refs.galleryDialog.display(context, gallery)
  },

  onDelete (galleryIndex) {
    this.setState(
      { promptedGalleryIdx: galleryIndex},
      () => this.refs.deleteConfirmationDialog.show()
    )
  },

  onConfirmDelete () {
    CmsActions.galleryDeleted(this.state.promptedGalleryIdx);
  },

  onCancelDelete () {
    this.setState({
      promptedGalleryIdx: -1
    })
  },

  render() {
    var galleryCount = this.state.galleries.size;
    var cardList = this.state.galleries.map((gallery, i) => {
      return (
        <GalleryCard
          gallery={gallery}
          galleryIndex={i}
          galleryCount={galleryCount}
          onDelete={this.onDelete}
          onEdit={this.displayDialog.bind(null, 'edit', gallery)}
        />
      );
    });
    return (
      <div id="gallery-manager">
        <div id="gallery-list">
          {cardList}
        </div>
        <GalleryDialog
          ref='galleryDialog'
        />
        <GalleryCreator
          onCreate={this.displayDialog.bind(null, 'create')}
        />
        <DeleteConfirmationDialog
          ref='deleteConfirmationDialog'
          onConfirm={this.onConfirmDelete}
          onCancel={this.onCancelDelete}
        />
      </div>
    );
  }
});

module.exports = GalleryManager;
