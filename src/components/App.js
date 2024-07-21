// 本文件是界面UI的根目录

import React from 'react';
import Head from './Head';
import Introduce from './Introduce';
import Conclusion from './Conclusion.js';
import PartnerInfo from './PartnerInfo.js';
import OtherInfo from './OtherInfo.js';
import AssistView from './AssistView';
import ControlPanel from './ControlPanel';
import Overview from './Overview';
import DetailView from './DetailView';

import Graph1LineChart from './Graph1LineChart';
import Graph2LineChart from './Graph2LineChart';
import Graph3BarCharttype from './Graph3BarCharttype';
import Graph4ModelName from './Graph4ModelName';
import Graph5SamplingTarget from './Graph5SamplingTarget';
import Graph6SamplingMethod from './Graph6SamplingMethod';
import Graph7DownsamplingLevel from './Graph7DownsamplingLevel';
import Graph8RunIndex from './Graph8RunIndex';
import Graph9PieChart from './Graph9PieChart';

import '../css/App.css'

// App组件
function App() {

  return <div className='root'>
    {/* <div className='controlPanel'>
          <ControlPanel/>
        </div>
        <div className='mainPanel'>
          <div className='overview'><Overview/></div>
          <div className='otherview'>
            <div className='assistView'><AssistView/></div>
            <div className='detailView'><DetailView/></div>
          </div>
        </div> */}
    {/* 网页头部开始 */}
    <div className="head">
      <Head />
    </div>
    {/* 网页头部结束 */}
    {/* 介绍部分开始 */}
    <div className="introduce" id='introduceId'>
      <Introduce />
    </div>
    {/* 介绍部分结束 */}
    {/* 数据可视化分析部分开始 */}
    <div className="dataVisualization" id='dataVisualizationId'>
      {/* 第一部分：折线图 */}
      <div className="overallGraph">
        此处放折线图组件
      </div>
      {/* {第一部分结束} */}
      {/* 第二部分：分析系统 */}
      <div className='systermGraph'>
        此处放分析系统组件
      </div>
      {/* 第二部分结束 */}
    </div>
    {/* 数据可视化分析部分结束 */}
    {/* 结论部分开始 */}
    <div className='conclusion'>
      <Conclusion />
    </div>
    {/* 结论部分结束 */}
    {/* 结尾部分 */}
    <div className="rear" id='rearId'>
      <PartnerInfo />
      <OtherInfo />
    </div>
    {/* 结尾部分结束 */}
  </div>;
}

export default App;
