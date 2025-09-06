'use client';

import { Layout } from '@/components/Layout/Layout';
import { Hero } from '@/components/Home/Hero';
import { Features } from '@/components/Home/Features';
import { CTA } from '@/components/Home/CTA';

export default function HomePage() {
  return (
    <Layout>
      <div className="space-y-16">
        <Hero />
        <Features />
        <CTA />
      </div>
    </Layout>
  );
}