import React from 'react';

interface GriffonProps {
  modalOpen: boolean;
  onClick: () => void;
}

const Griffon = ({ modalOpen, onClick }: GriffonProps) => {
  return (
    <>
      {modalOpen ? (
        <button onClick={onClick}>Get current Magic Item</button>
      ) : (
        <p>Open a magic item first</p>
      )}
    </>
  );
};

export default Griffon;
