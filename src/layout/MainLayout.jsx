import React from 'react';
import Header from '@components/Header';
import Nav from '@common/Nav';
import {AuthContext} from 'context/AuthContext';
function MainLayout({children}) {
  const {user} = React.useContext(AuthContext);
  return (
    <>
      <div className="min-h-full">
        {user && (
          <>
            <Header />
            <Nav />
          </>
        )}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export {MainLayout};
