import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export const AppMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <div className="h-full pt-[var(--header-height)]">
        <main className="min-h-[calc(100%-var(--header-height))]">
          {children}
        </main>
        <AppFooter />
      </div>
    </>
  );
};
