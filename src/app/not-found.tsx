import { Button } from '@/components/ui';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-5 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        That page is not here.
      </h1>
      <p className="mt-5 max-w-prose text-muted">
        It may have moved when this site was rebuilt. The programme guide starts on the home page.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button href="/">Back to the start</Button>
        <Button href="/faq/" variant="outline">
          Read the FAQ
        </Button>
      </div>
    </section>
  );
}
