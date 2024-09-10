'use client';

import { TextInput } from '@mantine/core';

export const SearchBar: React.FC = () => {

  return (
    <div style={{marginLeft: '50px', marginTop: '35px'}}>
        <TextInput
            radius="xl"
            placeholder="Search"
            style={{ width: '550px' }}
        />
    </div>
  );
};
