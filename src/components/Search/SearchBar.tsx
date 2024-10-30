import React from 'react';
import { TextInput } from '@mantine/core';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div>
            <TextInput
                radius="xl"
                placeholder="Search"
                style={{ width: '700px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
        </div>
    );
};
