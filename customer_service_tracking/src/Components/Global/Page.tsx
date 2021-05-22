import React from 'react';


interface Props {
  children: React.ReactElement;
}
const Page = ({ children }: Props) => (
  <main id="js-page-content" role="main" className="page-content">
    {children}
  </main>
);

export default Page;
