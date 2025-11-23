'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import ProjectCard from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import NoResults from '@/components/NoResults';
import { checkAllProjects } from '@/services/checkerService';
import { ProjectCheckResult } from '@/types';

export default function Home() {
  const [results, setResults] = useState<ProjectCheckResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCheck = async (address: string) => {
    setIsLoading(true);
    setHasSearched(false);
    setResults([]);

    try {
      const eligibleProjects = await checkAllProjects(address);
      setResults(eligibleProjects);
    } catch (error) {
      console.error('Error checking projects:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    if (hasSearched && resultsRef.current && !isLoading) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [hasSearched, isLoading, results]);

  const showResults = hasSearched && !isLoading;

  return (
    <main className="min-h-screen text-white relative">
      <div 
        className="fixed inset-0 z-0 bg-black"
        style={{
          backgroundImage: 'url(/img/monad_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`container mx-auto px-4 max-w-2xl ${!showResults ? 'min-h-screen flex flex-col justify-center py-12' : 'py-12'}`}>
        <div className="text-center mb-10 px-4">
          <h1 className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold mb-3
              bg-gradient-to-r from-blue-400 via-[#6f54ff] to-blue-400
              bg-clip-text text-transparent
            "
          >
            Monad NFT Checker
          </h1>

          <p className="
              text-gray-400 
              text-sm
              sm:text-base
              md:text-lg
              mb-5
              mx-auto
            "
          >
            Check your eligibility for multiple Monad NFT projects in one place. 
            Simply paste your address and discover which projects you&apos;re eligible for.
          </p>

          <p className="text-gray-500 text-xs sm:text-sm">
            Made with{" "}
            <a
              href="https://nekowawolf.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6f54ff] hover:text-[#5d45e6] transition-colors font-semibold"
            >
              nekowawolf
            </a>
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <SearchBar onCheck={handleCheck} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        <div ref={resultsRef} className="space-y-6">
          {isLoading && <Loading />}
          
          {!isLoading && hasSearched && results.length === 0 && <NoResults />}
          
          {!isLoading && results.length > 0 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Eligible Projects ({results.length})
                </h2>
                <p className="text-gray-400">
                  You are eligible for the following projects:
                </p>
              </div>
              <div className="flex flex-col gap-6">
                {results.map((result) => (
                  <ProjectCard
                    key={result.project.id}
                    project={result.project}
                    eligibility={result.eligibility}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Follow Section */}
        {hasSearched && (
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-2">
              Follow{' '}
              <a
                href="https://x.com/nekowawolf_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6f54ff] hover:text-[#5d45e6] transition-colors font-semibold inline-flex items-center gap-1"
              >
                @nekowawolf
              </a>
            </p>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}