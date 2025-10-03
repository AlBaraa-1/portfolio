import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import GameProjectDetail from '../components/GameProjectDetail';
import { projects } from '../data/portfolioData';

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <Navigate to="/" replace />;

  // Derive basic props from existing data; can be customized per project later.
  const bossFights = (project.challenges ?? []).map((challenge, i) => ({
    challenge,
    solution: project.solutions?.[i] ?? 'WIP: Solution details coming soon'
  }));

  const timeline = (project.challenges ?? []).map((note, i) => ({
    level: `Level ${i + 1}`,
    note
  }));

  const stats = project.outcomes?.slice(0, 4).map((o, i) => ({
    label: o.length > 18 ? o.slice(0, 18) + '…' : o,
    value: (i + 1) * 25,
    suffix: '%'
  })) ?? [];

  return (
    <Layout>
      <GameProjectDetail
        project={project}
        bossFights={bossFights}
        timeline={timeline}
        stats={stats}
      />
    </Layout>
  );
};

export default ProjectDetailsPage;
