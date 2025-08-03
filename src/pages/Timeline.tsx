import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Calendar, Trophy, Users, Gamepad2, ArrowLeft } from 'lucide-react';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  details: string[];
}

const Timeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const timelineEvents: TimelineEvent[] = [
    {
      year: 2003,
      title: "DOTA诞生",
      description: "Eul创造了第一个DOTA地图",
      details: [
        "基于魔兽争霸3：混乱之治",
        "开创了MOBA游戏类型",
        "简单的英雄和技能系统"
      ]
    },
    {
      year: 2004,
      title: "DOTA Allstars",
      description: "Guinsoo整合各版本，创造Allstars",
      details: [
        "整合了多个DOTA版本",
        "引入了更多英雄和物品",
        "奠定了现代DOTA基础"
      ]
    },
    {
      year: 2005,
      title: "IceFrog时代",
      description: "IceFrog接手开发，DOTA进入黄金时代",
      details: [
        "平衡性大幅提升",
        "新英雄和机制不断加入",
        "竞技性达到新高度"
      ]
    },
    {
      year: 2009,
      title: "浩方对战平台",
      description: "国内DOTA玩家的主要聚集地",
      details: [
        "降低了联机门槛",
        "培养了大批DOTA玩家",
        "见证了无数经典对局"
      ]
    }
  ];

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-dota-primary text-white">
      {/* 导航栏 */}
      <nav className="bg-dota-primary/90 backdrop-blur-sm border-b border-dota-light p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-dota-accent hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-pixel">返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold font-pixel text-dota-accent">DOTA时间轴</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 时间轴内容 */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={event.year} className="flex items-center space-x-8 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              {/* 年份圆圈 */}
              <div 
                className="flex-shrink-0 w-20 h-20 bg-dota-accent rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleYearClick(event.year)}
              >
                <span className="font-pixel text-white font-bold">{event.year}</span>
              </div>
              
              {/* 事件内容 */}
              <div className="flex-1 retro-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-dota-accent mb-2 font-pixel">{event.title}</h3>
                <p className="text-gray-300 mb-4 font-chinese">{event.description}</p>
                <ul className="space-y-1">
                  {event.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-400 font-chinese">• {detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 用户数据上传抽屉 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsDrawerOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-96 bg-dota-dark p-6 transform transition-transform" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dota-accent mb-4 font-pixel">上传{selectedYear}年战绩</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-chinese mb-2">战绩截图</label>
                <div className="border-2 border-dashed border-dota-accent p-4 rounded-lg text-center">
                  <Upload className="mx-auto mb-2" size={24} />
                  <p className="text-sm text-gray-400 font-chinese">点击或拖拽上传截图</p>
                </div>
              </div>
              <button className="w-full bg-dota-accent text-white py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors">
                生成战绩卡片
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;