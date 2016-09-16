import test from 'tape';
import deepFreeze from 'deep-freeze';

import {setMetronomeSetting} from '__mySource/actions';
import metronomeSetting from '__mySource/store/reducers/metronomeSetting';

test('Set classicTicksPerMinute, classicTicksPerBeat', nest => {
  nest.test('initial', assert => {
    const message = `should set {classicTicksPerMinute: 60, classicTicksPerBeat: 1}`;

    const expected = {
      classicTicksPerMinute: 60,
      classicTicksPerBeat: 1
    };

    const actual = metronomeSetting();

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
  nest.test('SET_METRONOME_SETTING', assert => {
    const message = 'should set classicTicksPerMinute & classicTicksPerBeat';

    const stateBefore = {
      classicTicksPerMinute: 60,
      classicTicksPerBeat: 1
    };

    const action = setMetronomeSetting({
      classicTicksPerMinute: 15,
      classicTicksPerBeat: 3
    });

    const expected = {
      classicTicksPerMinute: 15,
      classicTicksPerBeat: 3
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = metronomeSetting(stateBefore, action);

    assert.deepEqual(actual, expected, message);
    assert.end();
  });
});
