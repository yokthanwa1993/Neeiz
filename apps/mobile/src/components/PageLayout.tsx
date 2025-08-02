import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  backgroundClass?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, backgroundClass = 'bg-gray-50' }) => {
  return (
    <div className={`relative flex flex-col h-screen overflow-hidden ${backgroundClass}`}>
      {children}
    </div>
  );
};

export default PageLayout;