import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sword, Shield, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Hero {
  id: number;
  name: string;
  title: string;
  attribute: 'strength' | 'agility' | 'intelligence';
  role: string;
  description: string;
  lore: string;
}

const Heroes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const heroes: Hero[] = [
    {
      id: 1,
      name: '敌法师',
      title: 'Anti-Mage',
      attribute: 'agility',
      role: '核心/后期',
      description: '拥有强大机动性和法术免疫能力的敏捷英雄',
      lore: '在破法者的修道院中，敌法师学会了对抗魔法的技艺。'
    },
    {
      id: 2,
      name: '屠夫',
      title: 'Pudge',
      attribute: 'strength',
      role: '辅助/先手',
      description: '拥有致命钩子的力量英雄，DOTA永恒的象征',
      lore: '来自腐烂沼泽的屠夫，以其精准的肉钩闻名于世。'
    },
    {
      id: 3,
      name: '祈求者',
      title: 'Invoker',
      attribute: 'intelligence',
      role: '核心/法师',
      description: '拥有十个技能的智力英雄，操作天花板',
      lore: '掌握着古老魔法的祈求者，能够召唤各种强大的法术。'
    }
  ];

  const getAttributeIcon = (attribute: string) => {
    switch (attribute) {
      case 'strength': return <Sword className="text-red-500" size={20} />;
      case 'agility': return <Zap className="text-green-500" size={20} />;
      case 'intelligence': return <Shield className="text-blue-500" size={20} />;
      default: return null;
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
          <h1 className="text-2xl font-bold font-pixel text-dota-accent">英雄谱</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* 羊皮纸背景的电子书 */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 text-black rounded-lg shadow-2xl p-8 min-h-96">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroes.map((hero, index) => (
              <div 
                key={hero.id} 
                className="retro-card p-4 cursor-pointer transform hover:scale-105 transition-all"
                onClick={() => setSelectedHero(hero)}
              >
                {/* 英雄头像占位 */}
                <div className="w-full h-32 bg-dota-light rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-dota-accent font-pixel text-lg">{hero.name}</span>
                </div>
                
                {/* 英雄信息 */}
                <div className="text-center">
                  <h3 className="font-bold text-dota-accent font-pixel mb-1">{hero.name}</h3>
                  <p className="text-sm text-gray-300 font-chinese mb-2">{hero.title}</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {getAttributeIcon(hero.attribute)}
                    <span className="text-xs text-gray-400 font-chinese">{hero.role}</span>
                  </div>
                  <p className="text-xs text-gray-300 font-chinese">{hero.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 翻页控制 */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button className="p-2 bg-dota-accent text-white rounded-full hover:bg-orange-700 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="font-pixel text-dota-primary">第 1 页</span>
            <button className="p-2 bg-dota-accent text-white rounded-full hover:bg-orange-700 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 英雄详情模态框 */}
      {selectedHero && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setSelectedHero(null)}>
          <div className="bg-dota-dark p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-dota-accent mb-4 font-pixel">{selectedHero.name}</h3>
            <p className="text-gray-300 font-chinese mb-4">{selectedHero.lore}</p>
            <div className="flex items-center space-x-2 mb-4">
              {getAttributeIcon(selectedHero.attribute)}
              <span className="text-sm text-gray-400 font-chinese">{selectedHero.role}</span>
            </div>
            <button 
              className="w-full bg-dota-accent text-white py-2 rounded-lg font-pixel hover:bg-orange-700 transition-colors"
              onClick={() => setSelectedHero(null)}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heroes;