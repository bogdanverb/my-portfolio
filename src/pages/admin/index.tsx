import React from 'react';
import { CMS } from 'netlify-cms-app';

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Админка</h1>
      <CMS />
    </div>
  );
};

export default AdminPage;