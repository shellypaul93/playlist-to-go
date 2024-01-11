import React, { CSSProperties } from 'react';
import HashLoader from 'react-spinners/HashLoader';

interface SpinnerProps {
  loading: boolean;
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <HashLoader
      color={'#9333ea'}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
