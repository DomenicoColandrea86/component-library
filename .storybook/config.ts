import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
const req = require.context('../stories', true, /\.story\.tsx$/);
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          marginRight: '20px',
          fontSize: '25px',
          display: 'inline',
        },
        body: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        h2: {
          display: 'inline',
          color: '#999',
        },
      },
      infoBody: {
        backgroundColor: '#eee',
        padding: '0px 5px',
        lineHeight: '2',
      },
    },
    inline: true,
    source: false,
  })
);
