import React from 'react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      {children}
    </div>
  );
};

export default PublicLayout;
