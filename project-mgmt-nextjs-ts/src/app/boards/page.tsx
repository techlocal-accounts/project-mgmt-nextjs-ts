'use client';

import { Layout } from '@/components/Layout/Layout';
import { KanbanBoard } from '@/components/Kanban/KanbanBoard';

export default function BoardsPage() {
  return (
    <Layout>
      <div className="h-screen">
        <KanbanBoard boardId="demo-board" />
      </div>
    </Layout>
  );
}