'use client';

import { Project, EligibilityResult } from '@/types';
import { ExternalLink, Twitter } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  eligibility: EligibilityResult;
}

export default function ProjectCard({ project, eligibility }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-[#6f54ff] transition-all">
      <div className="flex items-start gap-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        
        {/* Content Container */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
          
          {/* Message dan Details */}
          <div className="space-y-2">
            {eligibility.message && (
              <p className="text-green-400 font-semibold text-base">{eligibility.message}</p>
            )}
            {eligibility.details && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {eligibility.details}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <a
          href={project.checkerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          Checker
        </a>
        <a
          href={project.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all text-sm font-medium"
        >
          <Twitter className="w-4 h-4" />
          Account
        </a>
      </div>
    </div>
  );
}