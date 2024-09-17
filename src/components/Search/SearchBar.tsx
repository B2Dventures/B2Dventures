'use client';

import { TextInput } from '@mantine/core';

export const SearchBar: React.FC = () => {

  return (
    <div>
        <TextInput
            radius="xl"
            placeholder="Search"
            style={{ width: '700px' }}
        />
    </div>
  );
};
