import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import './index.scss';
import { styles } from './jsSlyles';
export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            docked
            containerClassName={this.state.open ? 'head__toolbar_open' : 'head__toolbar_hide'}
            open={this.state.open}
          >
            <AppBar onLeftIconButtonClick={this.handleToggle} />
            <List>
              <ListItem
                innerDivStyle={styles.listItem}
                primaryText={this.state.open ? 'Inbox' : ''}
                leftIcon={<ContentInbox />}
              />
              <ListItem
                innerDivStyle={styles.listItem}
                primaryText={this.state.open ? 'Starred' : ''}
                leftIcon={<ActionGrade />}
              />
              <ListItem
                innerDivStyle={styles.listItem}
                primaryText={this.state.open ? 'Sent mail' : ''}
                leftIcon={<ContentSend />}
              />
              <ListItem
                innerDivStyle={styles.listItem}
                primaryText={this.state.open ? 'Drafts' : ''}
                leftIcon={<ContentDrafts />}
              />
              <ListItem
                innerDivStyle={styles.listItem}
                primaryText={this.state.open ? 'Inbox' : ''}
                leftIcon={<ContentInbox />}
              />
            </List>
          </Drawer>
          <div
            className={this.state.open ? 'head__menu_open' : 'head__menu_hide'}
          >
            <div
              style={{
                width: '50%',
                margin: '0 auto',
                border: '2px solid #FF9800',
                backgroundColor: '#ffd699',
              }}
            >Some TEXT</div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
