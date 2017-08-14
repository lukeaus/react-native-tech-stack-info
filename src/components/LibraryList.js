import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

// We want to only create elements that are visible on the screen
// As the components move around, the ListView keeps the same components
// on the screen but just switches out the data from inside of them

// we need to reach into redux state to get the libraries data
class LibraryList extends Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    // take our list of libraries to render a list of data to the screen
    this.dataSource = ds.cloneWithRows(this.props.libraries);
  }

  renderRow(library) {
    return (
      <ListItem
        library={library}
      />
    );
  }

  render() {
    console.log(this.props);
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

// Purpose of mapStateToProps is to take the global application 'state'
// and map it (take some properies off it) and provide them as props
// to our component LibraryList
const mapStateToProps = state => {
  return { libraries: state.libraries };
};

// connect returns a function
export default connect(mapStateToProps)(LibraryList);
