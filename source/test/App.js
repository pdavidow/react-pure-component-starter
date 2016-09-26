import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import combinedReducers from '../store/reducers';
import createApp from '../App.js';
////////////////////////////////////

const render = reactDom.renderToStaticMarkup;
let store = createStore(combinedReducers);
const App = createApp(React);

test('Metronome', assert => {
  const msg = 'Should render all sections.';

  const el =
    <Provider store={store}>
      <App />
    </Provider>;

  const $ = dom.load(render(el));
  const beatClass = 'beat';
  const beatPlayerClass = 'beatPlayer';
  const metronomeSettingClass = 'metronomeSetting';
  const tickAssignmentClass = 'tickAssignment';

  const actual = {
    beat: Boolean($(`.${ beatClass }`).html()),
    beatPlayer: Boolean($(`.${ beatPlayerClass }`).html()),
    metronomeSetting: Boolean($(`.${ metronomeSettingClass }`).html()),
    tickAssignment: Boolean($(`.${ tickAssignmentClass }`).html()),
  };

  const expected = {
    beat: true,
    beatPlayer: true,
    metronomeSetting: true,
    tickAssignment: true,
  };

  assert.deepEqual(actual, expected, msg);

  assert.end();
});
