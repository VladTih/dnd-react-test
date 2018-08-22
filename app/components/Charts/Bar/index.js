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
import * as Chart from 'react-chartjs-2';
import {
  XYPlot,
  LineSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas,
  MarkSeries
} from 'react-vis';
import '../../../../node_modules/react-vis/dist/style.css';

export default class BarComponet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    useCanvas: true,
  }
  render() {
    const { useCanvas } = this.state;
    const BarSeries = useCanvas ? HorizontalBarSeriesCanvas : HorizontalBarSeries;
    const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    const dataVis = [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 2 },
      { x: 9, y: 0 },
    ];
    const dataVis2 = [
      { x: 3, y: 8 },
      { x: 5, y: 5 },
      { x: 6, y: 4 },
      { x: 3, y: 9 },
      { x: 12, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 0, y: 2 },
      { x: 9, y: 0 },
    ];
    const MARGIN = {
      left: 10,
      right: 10,
      bottom: 80,
      top: 20
    };
    const timestamp = new Date('May 23 2017').getTime();
    const ONE_DAY = 86400000;
    const WORDS = [
      'cool',
      'dog',
      'skateboard',
      'wow',
      'such',
      (<tspan>
        <tspan x="0" dy="1em">Multiline</tspan>
        <tspan x="0" dy="1em">dogs</tspan>
      </tspan>)
    ];
    return (
      <div>

        <Chart.Bar
          data={data}
          width={100}
          height={100}
          getDatasetAtEvent={(dataset) => console.log(dataset)}
          options={{
            maintainAspectRatio: false,
            onClick: (dataClick) => { console.log(dataClick); },
          }}
        />
        <XYPlot height={300} width={300} >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis hideTicks />
          <XAxis top={0} tickValues={[0, 1, 5]} title="X" />
          <YAxis />
          <LineSeries
            data={dataVis}
            color={'black'}
            // onNearestX={(datapoint, event) => {
            //   console.log(datapoint);
            //             // does something on mouseover
            //             // you can access the value of the event
            // }}
            onSeriesClick={(event, value) => {
              console.log(value);
            }}
          />
          <LineSeries data={dataVis2} color={'red'} />
        </XYPlot>
        <div>
          <p> ГРафик Юджина</p>
          <button
            style={{ background: 'red' }}
            onClick={() => this.setState({ useCanvas: !useCanvas })}
          />
          <XYPlot margin={MARGIN} width={300} height={300}>
            <YAxis hideTicks/>
            <YAxis left={50} />
            <YAxis   left={50} tickFormat={v => WORDS[v]}/>
            <MarkSeries data={[{x: 0, y: 0}, {x: 5, y: 5}]} opacity={0} opacityType="linear"/>
          </XYPlot>
          <XYPlot
            width={800}
            height={800}
            stackBy="x"
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis
              top={0}
              tickFormat={(v) => `Value is someText ${v}`}
              tickLabelAngle={0}
            />


            <BarSeries
              stroke
              data={[
                { y: 2, x: 10, label: 'woah!', yOffset: 5 },
              ]}
            />
            <BarSeries
              data={[
                { y: 2, x: 2, label: 'woah!' },
              ]}
            />
            <BarSeries
              data={[
                { y: 2, x: 2 },
              ]}
            />
          </XYPlot>

        </div>
      </div>
    );
  }
}
