import React, { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-5 lg:px-1 bg-white">
      <div className="pt-9 pb-0">{children}</div>
    </div>
  );
}

export default Container;
