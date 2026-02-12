
import React from 'react';

interface SkeletonProps {
    variant: 'card' | 'detail' | 'chart' | 'text';
    className?: string;
}

const BaseSkeleton = ({ className }: { className: string }) => (
    <div className={`bg-slate-200 animate-pulse rounded-lg ${className}`}></div>
);

const SkeletonCard = () => (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm h-[320px] flex flex-col justify-between">
        <div className="flex justify-between items-start mb-6">
            <div className="flex gap-2">
                <BaseSkeleton className="w-12 h-6 rounded-md" />
                <BaseSkeleton className="w-8 h-6 rounded-md" />
            </div>
            <BaseSkeleton className="w-12 h-12 rounded-2xl" />
        </div>
        <div className="space-y-2">
            <BaseSkeleton className="w-3/4 h-6" />
            <BaseSkeleton className="w-1/2 h-4" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
            <BaseSkeleton className="h-16 rounded-xl" />
            <BaseSkeleton className="h-16 rounded-xl" />
            <BaseSkeleton className="h-16 rounded-xl" />
            <BaseSkeleton className="h-16 rounded-xl" />
        </div>
        <BaseSkeleton className="w-full h-1 mt-4" />
    </div>
);

const SkeletonDetail = () => (
    <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
                <BaseSkeleton className="w-20 h-8" />
                <div className="h-8 w-px bg-slate-200"></div>
                <BaseSkeleton className="w-64 h-8" />
            </div>
            <BaseSkeleton className="w-32 h-10 rounded-xl" />
        </div>
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
            <BaseSkeleton className="w-full h-40 rounded-[2.5rem]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BaseSkeleton className="w-full h-[400px] rounded-[2.5rem]" />
                <BaseSkeleton className="w-full h-[400px] rounded-[2.5rem]" />
            </div>
        </div>
    </div>
);

const SkeletonLoader: React.FC<SkeletonProps> = ({ variant, className = "" }) => {
    if (variant === 'card') return <SkeletonCard />;
    if (variant === 'detail') return <SkeletonDetail />;
    if (variant === 'chart') return <BaseSkeleton className={`w-full h-full min-h-[200px] ${className}`} />;
    
    return <BaseSkeleton className={`h-4 w-full ${className}`} />;
};

export default SkeletonLoader;
