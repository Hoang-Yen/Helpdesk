import React from 'react';
import { VIDEOS } from '../data';
import { PlayCircle, Clock, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Videos: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Tutorials</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Watch step-by-step guides to master SpouX's features and grow your business validation skills.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map(video => (
                <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <div className="relative aspect-video bg-gray-900 group cursor-pointer">
                        <img 
                            src={video.thumbnailUrl} 
                            alt={video.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-16 w-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium 
                                ${video.level === 'Beginner' ? 'bg-green-100 text-green-700' : 
                                  video.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                                  'bg-red-100 text-red-700'}`}>
                                {video.level}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                        <p className="text-gray-500 text-sm mb-4 flex-1">{video.description}</p>
                        
                        <button className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Watch Video
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 bg-spoux-50 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full text-spoux-600 mb-4 shadow-sm">
                <BarChart className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-6">Our support team is here to help you solve specific problems.</p>
            <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-spoux-600 hover:bg-spoux-700 transition-colors">
                Contact Support
            </a>
        </div>
      </div>
    </div>
  );
};
