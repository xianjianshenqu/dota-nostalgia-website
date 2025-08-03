import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRandomJump = () => {
    const pages = ['/timeline', '/heroes', '/netbar', '/videos', '/radio'];
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    navigate(randomPage);
  };

  return (
    <div className="min-h-screen bg-dota-primary text-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-dota-accent rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-dota-accent rounded-full animate-bounce-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 顶部导航 */}
        <nav className="fixed top-0 left-0 right-0 bg-dota-primary/90 backdrop-blur-sm border-b border-dota-light z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto">
              <Link to="/" className="text-dota-accent hover:text-white transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">首页</Link>
              <Link to="/timeline" className="text-white hover:text-dota-accent transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">时间轴</Link>
              <Link to="/heroes" className="text-white hover:text-dota-accent transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">英雄谱</Link>
              <Link to="/netbar" className="text-white hover:text-dota-accent transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">黑店档案</Link>
              <Link to="/videos" className="text-white hover:text-dota-accent transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">录像馆</Link>
              <Link to="/radio" className="text-white hover:text-dota-accent transition-colors font-pixel text-sm sm:text-base md:text-lg whitespace-nowrap">老兵电台</Link>
            </div>
          </div>
        </nav>

        {/* 主要内容 */}
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
          <div className="text-center space-y-12 animate-fade-in">
            {/* 核心口号 */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dota-accent font-pixel leading-tight">
                十年饮冰
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-pixel">
                难凉热血
              </h2>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-chinese px-4">
              专为80后DOTA老玩家打造的怀旧主题网站<br/>
              重温青春岁月，分享游戏回忆
            </p>
            
            {/* 进入按钮 */}
            <div className="space-y-4 sm:space-y-6">
              <Link 
                to="/timeline" 
                className="inline-block px-8 sm:px-12 py-3 sm:py-4 bg-dota-accent text-white rounded-lg hover:bg-orange-700 transition-all duration-300 font-pixel text-lg sm:text-xl transform hover:scale-105 shadow-lg hover:shadow-dota-accent/50"
              >
                进入时间轴
              </Link>
              
              <div className="text-xs sm:text-sm text-gray-400 font-chinese px-4">
                点击上方按钮开始你的DOTA怀旧之旅
              </div>
            </div>
          </div>
        </div>
        
        {/* 页脚彩蛋导航 */}
        <footer className="fixed bottom-4 right-4">
          <div className="group">
            <button 
              onClick={handleRandomJump}
              className="w-12 h-12 bg-dota-light rounded-full opacity-30 hover:opacity-100 transition-all duration-300 group-hover:scale-110 flex items-center justify-center"
            >
              <span className="text-dota-accent font-pixel text-xs">?</span>
            </button>
            <div className="absolute bottom-16 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dota-dark p-3 rounded-lg shadow-lg">
              <div className="text-xs text-gray-300 font-chinese whitespace-nowrap">
                随机跳转彩蛋
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;