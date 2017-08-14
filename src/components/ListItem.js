import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          {/* flex: 1 tells Text: do not cut text off screen and wrap text and take
          up as much space as it needs to */}
          <Text style={{ flex: 1 }}>{library.description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { id, title } = this.props.library;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
};

// move logic from ListItem into mapStateToProps
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id
  return { expanded };
};

// 1st arg:: is mapStateToProps to get access to state in the component (or use null)
// 2nd arg:: actions object containing one or more action creators.,
//   Used to bind action creators to this component
//      * Take these action creators and make sure when they are called
//        that your actions go to the right place
//      * Pass these actions down into the component as props
//   Does 2 things:
//      * mutates action creators into something special where whenever it is
//        called, the returned action will automatically dispatched to the redux store
//      * takes all the actions inside this object and passes them all to this component
//        as props

// We can now call the action creator, that will generate an action and automatically
// dispatch it to all the different reducers in our application.
export default connect(mapStateToProps, actions)(ListItem);

