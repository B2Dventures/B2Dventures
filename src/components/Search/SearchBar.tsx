'use client';

import { TextInput } from '@mantine/core';

export const SearchBar: React.FC<SearchBarProps> = () => {

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
