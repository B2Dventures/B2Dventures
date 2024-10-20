'use client';

import { Header } from "@/components/Header/Header";
import InvestorClient from '@/components/InvestorClient/InvestorClient';
import { Container, Group, Button, Text } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import React, { useState, useEffect } from 'react';

interface Business {
  id: number;
  name: string;
  description: string;
  image: string;
  totalInvestment: number;
  investors: number;
}

export default function InvestorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);

  const fetchBusinesses = async (query: string) => {
    const res = await fetch(`http://localhost:3000/api/search?name=${query}`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    setBusinesses(data.campaignsWithTotalInvestment || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/campaign", {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await res.json();
      setBusinesses(data.campaignsWithTotalInvestment || []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const handler = setTimeout(() => {
        fetchBusinesses(searchQuery);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      fetchBusinesses('');
    }
  }, [searchQuery]);

  return (
    <main>
      <Header />
      <Container size={1440}>
        <Container fluid className={classes.searchBox}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Group>
            <Button size='s' variant="outline" color='rgb(0, 0, 0, 0.6)' radius='16'>Filter</Button>
            <Button size='s' variant="outline" color='rgb(0, 0, 0, 0.6)' radius='16'>Sort By</Button>
          </Group>
        </Container>
        <Text className={baiSemiBold.className}
              style={{ marginTop: '50px', marginLeft: '150px', marginBottom: '50px', fontSize: '35px' }}>
          Live Opportunities
        </Text>
        <InvestorClient businesses={businesses} />
      </Container>
    </main>
  );
}
