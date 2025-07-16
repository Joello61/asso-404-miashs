'use client';

import React from 'react';
import { MemberGrid, useMembers } from '@/components/membres/member-grid';

export default function TrombinoscopePage() {
  const { members, loading } = useMembers();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMemberClick = (member: any) => {
    // Navigation vers une page de détail ou modal
    console.log('Clic sur membre:', member);
    // Vous pouvez implémenter une modal ou navigation
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Trombinoscope
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvrez les membres de l&apos;Asso 404 MIASHS ! Étudiants
            passionnés de tech, data science, développement et bien plus encore.
          </p>
        </div>

        {/* Grille des membres */}
        <MemberGrid
          members={members}
          loading={loading}
          variant="grid"
          showFilters={true}
          showSearch={true}
          showStats={true}
          showViewToggle={true}
          itemsPerPage={24}
          onMemberClick={handleMemberClick}
        />
      </div>
    </div>
  );
}
