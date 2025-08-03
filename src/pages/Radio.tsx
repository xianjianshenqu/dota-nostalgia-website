import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock, ArrowLeft } from 'lucide-react';

interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  audioUrl: string;
  publishDate: string;
  isActive: boolean;
}

const Radio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(360); // 6分钟
  const [volume, setVolume] = useState(70);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [autoStop, setAutoStop] = useState(true);

  const episodes: Episode[] = [
    {
      id: 1,
      title: '老兵电台第一期：回忆那些年',
      description: '聊聊我们一起玩过的DOTA，那些难忘的青春岁月',
      duration: '06:00',
      audioUrl: '/audio/episode_01.mp3',
      publishDate: '2024-01-15',
      isActive: true
    },
    {
      id: 2,
      title: '老兵电台第二期：经典英雄回顾',
      description: '盘点那些年我们最爱的英雄和经典操作',
      duration: '06:30',
      audioUrl: '/audio/episode_02.mp3',
      publishDate: '2024-01-08',
      isActive: false
    },
    {
      id: 3,
      title: '老兵电台第三期：网吧时光',
      description: '回忆在网吧度过的那些激情岁月',
      duration: '05:45',
      audioUrl: '/audio/episode_03.mp3',
      publishDate: '2024-01-01',
      isActive: false
    }
  ];

  // 模拟音频可视化条
  const generateAudioBars = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div 
        key={i}
        className={`audio-bar ${
          isPlaying ? 'animate-pulse' : ''
        }`}
        style={{
          height: `${Math.random() * 40 + 10}px`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!currentEpisode) {
      setCurrentEpisode(episodes.find(ep => ep.isActive) || episodes[0]);
    }
  };

  // 检查是否到了23:00自动停止
  useEffect(() => {
    if (autoStop) {
      const now = new Date();
      if (now.getHours() >= 23) {
        setIsPlaying(false);
      }
    }
  }, [autoStop]);

  // 模拟播放进度
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div className="min-h-screen bg-dota-primary text-white">
      {/* 导航栏 */}
      <nav className="bg-dota-primary/90 backdrop-blur-sm border-b border-dota-light p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-dota-accent hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-pixel">返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold font-pixel text-dota-accent">老兵电台</h1>
          <div className="flex items-center space-x-2 text-sm font-chinese">
            <Clock size={16} />
            <span>23:00自动停止</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Winamp风格播放器 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-b from-gray-300 to-gray-500 p-1 rounded-lg">
            <div className="bg-dota-dark p-4 rounded">
              {/* 播放器标题栏 */}
              <div className="bg-dota-accent text-black px-3 py-1 mb-4 font-pixel text-sm">
                老兵电台 - Winamp 2.0 Style
              </div>
              
              {/* 当前播放信息 */}
              <div className="mb-4">
                <div className="text-dota-accent font-pixel mb-1">
                  {currentEpisode ? currentEpisode.title : '选择一个节目开始播放'}
                </div>
                <div className="text-sm text-gray-400 font-chinese">
                  {currentEpisode ? currentEpisode.description : ''}
                </div>
              </div>
              
              {/* 音频可视化 */}
              <div className="bg-black p-4 rounded mb-4">
                <div className="audio-visualizer justify-center">
                  {generateAudioBars()}
                </div>
              </div>
              
              {/* 进度条 */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-pixel mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="bg-dota-light h-2 rounded">
                  <div 
                    className="bg-dota-accent h-full rounded transition-all duration-1000"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* 控制按钮 */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button className="p-2 bg-dota-light rounded hover:bg-dota-accent transition-colors">
                  <SkipBack size={20} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="p-3 bg-dota-accent rounded-full hover:bg-orange-700 transition-colors"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="p-2 bg-dota-light rounded hover:bg-dota-accent transition-colors">
                  <SkipForward size={20} />
                </button>
              </div>
              
              {/* 音量控制 */}
              <div className="flex items-center space-x-3">
                <Volume2 size={16} />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 h-2 bg-dota-light rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-pixel w-8">{volume}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 节目列表 */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-dota-accent mb-6 font-pixel">节目列表</h2>
          <div className="space-y-4">
            {episodes.map((episode) => (
              <div 
                key={episode.id}
                className={`retro-card p-4 cursor-pointer transition-all ${
                  currentEpisode?.id === episode.id ? 'ring-2 ring-dota-accent' : ''
                }`}
                onClick={() => setCurrentEpisode(episode)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 font-pixel">{episode.title}</h3>
                    <p className="text-sm text-gray-400 font-chinese mb-2">{episode.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 font-chinese">
                      <span>时长：{episode.duration}</span>
                      <span>发布：{episode.publishDate}</span>
                      {episode.isActive && (
                        <span className="bg-dota-accent text-white px-2 py-1 rounded font-pixel">最新</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentEpisode(episode);
                      setIsPlaying(true);
                    }}
                    className="p-3 bg-dota-accent rounded-full hover:bg-orange-700 transition-colors"
                  >
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;