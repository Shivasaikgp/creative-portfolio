import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'hero' | 'skills' | 'experience' | 'projects' | 'education' | 'contact';
  className?: string;
}

const SkeletonLoader = ({ variant = 'hero', className = '' }: SkeletonLoaderProps) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear' as const,
    },
  };

  const SkeletonBox = ({ width, height, className: boxClassName = '' }: { width: string; height: string; className?: string }) => (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${boxClassName}`}
      style={{ width, height }}
      {...shimmer}
    />
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <SkeletonBox width="200px" height="200px" className="rounded-full mx-auto" />
              <div className="space-y-4">
                <SkeletonBox width="300px" height="48px" className="mx-auto" />
                <SkeletonBox width="400px" height="24px" className="mx-auto" />
                <SkeletonBox width="500px" height="20px" className="mx-auto" />
              </div>
              <div className="flex justify-center space-x-4">
                <SkeletonBox width="120px" height="44px" />
                <SkeletonBox width="120px" height="44px" />
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <SkeletonBox width="200px" height="40px" className="mx-auto mb-4" />
                <SkeletonBox width="400px" height="20px" className="mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <SkeletonBox width="100%" height="24px" />
                    <div className="space-y-3">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <SkeletonBox width="80%" height="16px" />
                          <SkeletonBox width="100%" height="8px" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <SkeletonBox width="250px" height="40px" className="mx-auto mb-4" />
                <SkeletonBox width="400px" height="20px" className="mx-auto" />
              </div>
              <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <SkeletonBox width="60px" height="60px" className="rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-4">
                      <SkeletonBox width="200px" height="24px" />
                      <SkeletonBox width="150px" height="16px" />
                      <SkeletonBox width="100%" height="60px" />
                      <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, j) => (
                          <SkeletonBox key={j} width="80px" height="24px" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <SkeletonBox width="200px" height="40px" className="mx-auto mb-4" />
                <SkeletonBox width="400px" height="20px" className="mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <SkeletonBox width="100%" height="200px" />
                    <SkeletonBox width="80%" height="24px" />
                    <SkeletonBox width="100%" height="60px" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, j) => (
                        <SkeletonBox key={j} width="60px" height="20px" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <SkeletonBox width="200px" height="40px" className="mx-auto mb-4" />
                <SkeletonBox width="400px" height="20px" className="mx-auto" />
              </div>
              <div className="space-y-12">
                <div className="text-center space-y-6">
                  <SkeletonBox width="120px" height="120px" className="mx-auto" />
                  <SkeletonBox width="300px" height="32px" className="mx-auto" />
                  <SkeletonBox width="200px" height="20px" className="mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <SkeletonBox width="100%" height="20px" />
                      <SkeletonBox width="80%" height="16px" />
                      <SkeletonBox width="60%" height="16px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <SkeletonBox width="200px" height="40px" className="mx-auto mb-4" />
                <SkeletonBox width="400px" height="20px" className="mx-auto" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <SkeletonBox width="100%" height="48px" />
                  <SkeletonBox width="100%" height="48px" />
                  <SkeletonBox width="100%" height="48px" />
                  <SkeletonBox width="100%" height="120px" />
                  <SkeletonBox width="120px" height="44px" />
                </div>
                <div className="space-y-6">
                  <SkeletonBox width="100%" height="60px" />
                  <div className="flex space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <SkeletonBox key={i} width="48px" height="48px" className="rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto space-y-4">
              <SkeletonBox width="100%" height="40px" />
              <SkeletonBox width="80%" height="20px" />
              <SkeletonBox width="60%" height="20px" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader;