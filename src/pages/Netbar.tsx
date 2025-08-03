import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Upload, Camera, ArrowLeft } from 'lucide-react';

interface NetbarData {
  id: number;
  name: string;
  slogan: string;
  location: { lat: number; lng: number; city: string };
  memories: string;
  submittedBy: string;
}

const Netbar: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNetbar, setSelectedNetbar] = useState<NetbarData | null>(null);

  const netbars: NetbarData[] = [
    {
      id: 1,
      name: '飞宇网吧',
      slogan: '激情对战，青春无悔',
      location: { lat: 39.9042, lng: 116.4074, city: '北京' },
      memories: '那时候每天放学都要来这里打DOTA，老板人很好，经常让我们赊账。',
      submittedBy: '老玩家001'
    },
    {
      id: 2,
      name: '星际网络',
      slogan: '网络天下，游戏人生',
      location: { lat: 31.2304, lng: 121.4737, city: '上海' },
      memories: '高中时代的回忆，和同学们一起五黑的地方，那时候的快乐很简单。',
      submittedBy: '怀旧玩家'
    }
  ];

  return (
    <div className="min-h-screen bg-dota-primary text-white">
      {/* 导航栏 */}
      <nav className="bg-dota-primary/90 backdrop-blur-sm border-b border-dota-light p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-dota-accent hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-pixel">返回首页</span>
          </Link>
          <h1 className="text-2xl font-bold font-pixel text-dota-accent">黑店档案</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-dota-accent text-white px-4 py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors"
          >
            投稿网吧
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 热力图区域 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-dota-accent mb-4 font-pixel">全国网吧分布图</h2>
          <div className="bg-dota-light rounded-lg p-8 text-center">
            <MapPin className="mx-auto mb-4 text-dota-accent" size={48} />
            <p className="text-gray-300 font-chinese">地图加载中...</p>
            <p className="text-sm text-gray-400 font-chinese mt-2">点击地图上的标记查看网吧详情</p>
          </div>
        </div>

        {/* 网吧列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {netbars.map((netbar) => (
            <div 
              key={netbar.id} 
              className="retro-card p-6 cursor-pointer"
              onClick={() => setSelectedNetbar(netbar)}
            >
              <h3 className="text-lg font-bold text-dota-accent mb-2 font-pixel">{netbar.name}</h3>
              <p className="text-sm text-gray-300 mb-2 font-chinese italic">「{netbar.slogan}」</p>
              <div className="flex items-center space-x-2 mb-3">
                <MapPin size={16} className="text-dota-accent" />
                <span className="text-sm text-gray-400 font-chinese">{netbar.location.city}</span>
              </div>
              <p className="text-sm text-gray-300 font-chinese line-clamp-3">{netbar.memories}</p>
              <div className="mt-4 text-xs text-gray-500 font-chinese">
                投稿人：{netbar.submittedBy}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 投稿表单模态框 */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-dota-dark p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dota-accent mb-4 font-pixel">投稿网吧信息</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="网吧名称" 
                className="w-full p-3 bg-dota-light text-white rounded-lg font-chinese"
              />
              <input 
                type="text" 
                placeholder="网吧口号" 
                className="w-full p-3 bg-dota-light text-white rounded-lg font-chinese"
              />
              <textarea 
                placeholder="分享你的回忆..." 
                rows={4}
                className="w-full p-3 bg-dota-light text-white rounded-lg font-chinese resize-none"
              />
              <div className="border-2 border-dashed border-dota-accent p-4 rounded-lg text-center">
                <Camera className="mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-400 font-chinese">上传合照（可选）</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-pixel hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button className="flex-1 bg-dota-accent text-white py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors">
                  提交
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 网吧详情模态框 */}
      {selectedNetbar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setSelectedNetbar(null)}>
          <div className="bg-dota-dark p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dota-accent mb-4 font-pixel">{selectedNetbar.name}</h3>
            <p className="text-gray-300 font-chinese italic mb-4">「{selectedNetbar.slogan}」</p>
            <p className="text-gray-300 font-chinese mb-4">{selectedNetbar.memories}</p>
            <div className="text-xs text-gray-500 font-chinese mb-4">
              投稿人：{selectedNetbar.submittedBy}
            </div>
            <button 
              className="w-full bg-dota-accent text-white py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors"
              onClick={() => setSelectedNetbar(null)}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Netbar;