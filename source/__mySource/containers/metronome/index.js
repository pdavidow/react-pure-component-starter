// todo
// - 'Stop' button
// - Disable Play button while playing
// - Animate ticks with sequence of vertical lines representing ticks, and dot on top/bottom for rh/lh; do highlights when played
// - ReduxForm v6
// - TESTS!!!!!!!!

import {connect} from 'react-redux';

import createBeat from '../../components/beat';
import createTickAssignment from '../../components/tickAssignment';
import createMetronomeSetting from '../../components/metronomeSetting';
import createBeatPlayer from '../../components/beatPlayer';
import {play} from '../../models/metronome';
import {
  setBeat,
  setMetronomeSetting
} from '__mySource/actions';
import {
  calc_tickCount,
  calc_rhTickIndices,
  calc_lhTickIndices
} from '__mySource/models/metronome';
////////////////////////////////////

export default (React) => {
  const Metronome = (props) => {
    const Beat = createBeat(React);
    const TickAssignment = createTickAssignment(React);
    const MetronomeSetting = createMetronomeSetting(React);
    const BeatPlayer = createBeatPlayer(React);

    return (
      <div>
        <Beat {...props}/>
        <p>=========================</p>
        <TickAssignment {...props}/>
        <p>=========================</p>
        <MetronomeSetting {...props}/>
        <p>=========================</p>
        <BeatPlayer {...props}/>
      </div>
    );
   };

  const mapStateToProps = (state) => {
    const beat = state.beat;
    const metronomeSetting = state.metronomeSetting;
    const tickCount = calc_tickCount(beat);
    const rhTickIndices = calc_rhTickIndices(beat);
    const lhTickIndices = calc_lhTickIndices(beat);
    const onEnded = () => console.log("ended");
    const onPlay = () => play({beat, metronomeSetting, onEnded});

    return {
      ...beat,
      ...metronomeSetting,
      tickCount,
      rhTickIndices,
      lhTickIndices,
      onPlay
    };
  };

  const mapDispatchToProps = (dispatch) => (
    {
      onBeatSubmit: ({rh, lh}) =>
        dispatch(setBeat({rh, lh}) ),
      onMetronomeSettingSubmit: ({classicTicksPerMinute, classicTicksPerBeat}) =>
        dispatch(setMetronomeSetting({classicTicksPerMinute, classicTicksPerBeat}) )
    }
  );

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Metronome);
};

