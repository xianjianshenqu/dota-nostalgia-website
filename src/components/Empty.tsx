import React from 'react'

interface EmptyProps {
  message?: string
  description?: string
}

const Empty: React.FC<EmptyProps> = ({ 
  message = '暂无数据', 
  description = '这里还没有任何内容' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-dota-light rounded-full flex items-center justify-center mb-4">
        <span className="text-dota-accent text-2xl">📭</span>
      </div>
      <h3 className="text-lg font-bold text-gray-300 mb-2 font-pixel">{message}</h3>
      <p className="text-sm text-gray-500 font-chinese">{description}</p>
    </div>
  )
}

export default Empty