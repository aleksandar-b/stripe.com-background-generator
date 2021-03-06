import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { inject, observer, PropTypes } from 'mobx-react';
import TabsControl from './tabs/TabsControl';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },

  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Controls extends Component {
  componentDidMount() {
    const { randomColorStore } = this.props;
    randomColorStore.fetchGradients().then(() => {
      randomColorStore.setRandomBackgroundAndPaletteFromGradients();
    });
  }

  render() {
    const { classes, store } = this.props;
    return (
      <div className={classes.root}>
        {store.isTabsOpen && <TabsControl />}
        <Button
          variant="fab"
          color="primary"
          aria-label="Toggle Tabs"
          className={classes.fab}
          onClick={() => store.toggleTabs()}
        >
          <Icon>settings_icon</Icon>
        </Button>
      </div>
    );
  }
}

Controls.propTypes = {
  classes: PropTypes.objectOrObservableObject.isRequired,
  randomColorStore: PropTypes.objectOrObservableObject.isRequired,
  store: PropTypes.objectOrObservableObject.isRequired,
};
export default withStyles(styles)(inject('randomColorStore', 'store')(observer(Controls)));
