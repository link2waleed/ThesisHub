import { useNavigate } from 'react-router-dom';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import {
    GraduationCap,
    Lightbulb,
    Search,
    Building2,
    BookOpen,
    Home,
} from 'lucide-react';
import { theses, thesisIdeas } from '@/data/mockData';

interface GlobalSearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GlobalSearchCommand({ open, onOpenChange }: GlobalSearchCommandProps) {
    const navigate = useNavigate();

    const runCommand = (callback: () => void) => {
        onOpenChange(false);
        callback();
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search thesis, ideas, organizations..." />
            <CommandList>
                <CommandEmpty>
                    <div className="flex flex-col items-center gap-2 py-6">
                        <Search className="w-10 h-10 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">No results found.</p>
                        <p className="text-xs text-muted-foreground/70">
                            Try searching for a different term.
                        </p>
                    </div>
                </CommandEmpty>

                <CommandGroup heading="Quick Links">
                    <CommandItem onSelect={() => runCommand(() => navigate('/'))}>
                        <Home className="mr-2 h-4 w-4" />
                        Home
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/thesis'))}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Browse Thesis
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/ideas'))}>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Thesis Ideas
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/about'))}>
                        <Building2 className="mr-2 h-4 w-4" />
                        About
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Thesis Opportunities">
                    {theses.slice(0, 4).map((thesis) => (
                        <CommandItem
                            key={thesis.id}
                            onSelect={() => runCommand(() => navigate(`/thesis/${thesis.id}`))}
                        >
                            <BookOpen className="mr-2 h-4 w-4 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-sm">{thesis.title}</span>
                                <span className="text-xs text-muted-foreground">
                                    {thesis.organization.name} · {thesis.location}
                                </span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Thesis Ideas">
                    {thesisIdeas.slice(0, 3).map((idea) => (
                        <CommandItem
                            key={idea.id}
                            onSelect={() => runCommand(() => navigate(`/ideas/${idea.id}`))}
                        >
                            <Lightbulb className="mr-2 h-4 w-4 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-sm">{idea.title}</span>
                                <span className="text-xs text-muted-foreground">
                                    {idea.author.name} · {idea.field}
                                </span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
