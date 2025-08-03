import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Upload, MessageCircle, Share2, ArrowLeft, Star } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  uploadedBy: string;
  views: number;
  isFeatured: boolean;
  uploadDate: string;
}

interface DanmakuMessage {
  id: number;
  content: string;
  timestamp: number;
  user: string;
}

const Videos: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [danmakuInput, setDanmakuInput] = useState('');
  const [danmakuMessages, setDanmakuMessages] = useState<DanmakuMessage[]>([]);

  const videos: Video[] = [
    {
      id: 1,
      title: '经典屠夫神钩集锦',
      description: '那些年让人热血沸腾的神级钩子',
      thumbnail: '/placeholder-video.jpg',
      duration: '00:15',
      uploadedBy: 'DOTA老兵',
      views: 1234,
      isFeatured: true,
      uploadDate: '2024-01-15'
    },
    {
      id: 2,
      title: '敌法师一打五翻盘',
      description: '后期敌法的恐怖输出',
      thumbnail: '/placeholder-video.jpg',
      duration: '00:12',
      uploadedBy: '怀旧玩家',
      views: 856,
      isFeatured: false,
      uploadDate: '2024-01-10'
    },
    {
      id: 3,
      title: '祈求者十连杀',
      description: '操作天花板的完美演示',
      thumbnail: '/placeholder-video.jpg',
      duration: '00:18',
      uploadedBy: '技术流',
      views: 2341,
      isFeatured: true,
      uploadDate: '2024-01-08'
    }
  ];

  const sendDanmaku = () => {
    if (danmakuInput.trim()) {
      const newMessage: DanmakuMessage = {
        id: Date.now(),
        content: danmakuInput,
        timestamp: Date.now(),
        user: '匿名用户'
      };
      setDanmakuMessages([...danmakuMessages, newMessage]);
      setDanmakuInput('');
    }
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
          <h1 className="text-2xl font-bold font-pixel text-dota-accent">录像馆</h1>
          <button 
            onClick={() => setShowUpload(true)}
            className="bg-dota-accent text-white px-4 py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors"
          >
            上传视频
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 精选视频区域 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-dota-accent mb-4 font-pixel flex items-center">
            <Star className="mr-2" size={20} />
            本周精选
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.filter(v => v.isFeatured).map((video) => (
              <div 
                key={video.id} 
                className="retro-card p-4 cursor-pointer transform hover:scale-105 transition-all"
                onClick={() => setSelectedVideo(video)}
              >
                {/* 视频缩略图 */}
                <div className="relative bg-dota-light rounded-lg mb-4 h-32 flex items-center justify-center">
                  <Play className="text-dota-accent" size={32} />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-pixel">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-dota-accent text-white text-xs px-2 py-1 rounded font-pixel">
                    精选
                  </div>
                </div>
                
                {/* 视频信息 */}
                <h3 className="font-bold text-white mb-2 font-pixel text-sm">{video.title}</h3>
                <p className="text-xs text-gray-400 font-chinese mb-2">{video.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 font-chinese">
                  <span>{video.uploadedBy}</span>
                  <span>{video.views} 观看</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 全部视频 */}
        <div>
          <h2 className="text-xl font-bold text-dota-accent mb-4 font-pixel">全部视频</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="retro-card p-3 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative bg-dota-light rounded-lg mb-3 h-24 flex items-center justify-center">
                  <Play className="text-dota-accent" size={24} />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded font-pixel">
                    {video.duration}
                  </div>
                </div>
                <h4 className="font-bold text-white mb-1 font-pixel text-xs">{video.title}</h4>
                <div className="text-xs text-gray-500 font-chinese">
                  {video.views} 观看
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 视频播放模态框 */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setSelectedVideo(null)}>
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* 视频播放器 */}
            <div className="relative bg-black rounded-lg mb-4 h-64 md:h-96 flex items-center justify-center">
              <Play className="text-dota-accent" size={64} />
              
              {/* 弹幕显示区域 */}
              <div className="absolute inset-0 pointer-events-none">
                {danmakuMessages.slice(-5).map((msg, index) => (
                  <div 
                    key={msg.id}
                    className="danmaku absolute text-white text-sm"
                    style={{
                      top: `${20 + index * 40}px`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 视频信息和弹幕输入 */}
            <div className="bg-dota-dark p-4 rounded-lg">
              <h3 className="text-lg font-bold text-dota-accent mb-2 font-pixel">{selectedVideo.title}</h3>
              <p className="text-gray-300 font-chinese mb-4">{selectedVideo.description}</p>
              
              {/* 弹幕输入 */}
              <div className="flex space-x-2 mb-4">
                <input 
                  type="text" 
                  value={danmakuInput}
                  onChange={(e) => setDanmakuInput(e.target.value)}
                  placeholder="发送弹幕..." 
                  className="flex-1 p-2 bg-dota-light text-white rounded font-chinese"
                  onKeyPress={(e) => e.key === 'Enter' && sendDanmaku()}
                />
                <button 
                  onClick={sendDanmaku}
                  className="bg-dota-accent text-white px-4 py-2 rounded font-pixel hover:bg-orange-700 transition-colors"
                >
                  发送
                </button>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-sm text-gray-400 font-chinese">
                  <span>{selectedVideo.uploadedBy}</span>
                  <span>{selectedVideo.views} 观看</span>
                  <span>{selectedVideo.uploadDate}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-dota-light text-white rounded hover:bg-dota-accent transition-colors">
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded font-pixel hover:bg-gray-700 transition-colors"
                  >
                    关闭
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 上传视频模态框 */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowUpload(false)}>
          <div className="bg-dota-dark p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dota-accent mb-4 font-pixel">上传视频</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="视频标题" 
                className="w-full p-3 bg-dota-light text-white rounded-lg font-chinese"
              />
              <textarea 
                placeholder="视频描述..." 
                rows={3}
                className="w-full p-3 bg-dota-light text-white rounded-lg font-chinese resize-none"
              />
              <div className="border-2 border-dashed border-dota-accent p-4 rounded-lg text-center">
                <Upload className="mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-400 font-chinese">上传视频文件（最大15秒）</p>
              </div>
              <div className="border-2 border-dashed border-gray-500 p-4 rounded-lg text-center">
                <MessageCircle className="mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-400 font-chinese">上传语音解说（可选）</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowUpload(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-pixel hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button className="flex-1 bg-dota-accent text-white py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors">
                  上传
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;