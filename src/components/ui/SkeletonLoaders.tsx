import { Skeleton } from '@/components/ui/skeleton';

export function ThesisCardSkeleton() {
    return (
        <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2.5 w-16" />
                </div>
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    );
}

export function IdeaCardSkeleton() {
    return (
        <div className="rounded-xl bg-card border border-border/50 p-5 space-y-3">
            <div className="flex items-center gap-2.5">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-14" />
                </div>
            </div>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-18 rounded-full" />
            </div>
            <div className="flex items-center gap-4 pt-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-10" />
            </div>
        </div>
    );
}

export function FeedSkeleton({ count = 6, type = 'thesis' }: { count?: number; type?: 'thesis' | 'idea' }) {
    const Card = type === 'thesis' ? ThesisCardSkeleton : IdeaCardSkeleton;
    return (
        <div className={`grid gap-4 ${type === 'thesis' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {Array.from({ length: count }).map((_, i) => <Card key={i} />)}
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-3">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-40 w-full rounded-xl" />
            <div className="space-y-3">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-3/4" />
            </div>
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-5">
                <Skeleton className="w-20 h-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
            <Skeleton className="h-24 w-full rounded-xl" />
            <div className="grid sm:grid-cols-2 gap-4">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
            </div>
        </div>
    );
}
