/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import BarComponet from '../../components/Charts/Bar';

import './index.scss';
export default class SortableSimple extends React.PureComponent {
  // static propTypes = {
  //   boards: PropTypes.instanceOf(List),
  //   moveBorders: PropTypes.func,
  //   moveCardsOutSideDesk: PropTypes.func,
  //   moveCardsInsideDesk: PropTypes.func,
  //   deleteDesk: PropTypes.func,
  //   deleteCard: PropTypes.func,
  //   addDesk: PropTypes.func,
  //   addCard: PropTypes.func,
  //   changeCardText: PropTypes.func,
  // }
  constructor(props) {
    super(props);
  }
  render() {
    const {
      boards,
    } = this.props;
    return (
      <BarComponet />
    );
  }
}
