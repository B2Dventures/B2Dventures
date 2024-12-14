'use client';

import { Header } from "@/components/Header/Header";
import InvestorClient from '@/components/InvestorClient/InvestorClient';
import { NavItem } from "@/components/Header/NavItem/NavItem";
import { Container, Group, Button, Text, Select } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts';
import React, { useState, useEffect } from 'react';
import { Business } from "types/api";

export default function InvestorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [sortOption, setSortOption] = useState('');

  const fetchBusinesses = async (query: string, sort: string) => {
    try {
      const url = new URL('http://localhost:3000/api/campaign');
      if (query) {
        url.searchParams.append('name', query);
      }
      if (sort) {
        url.searchParams.append('sort', sort);
      }

      const res = await fetch(url.toString(), {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setBusinesses(data.campaigns || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      window.location.href = '/error';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchBusinesses('', sortOption);
    };

    fetchData();
  }, [sortOption]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const handler = setTimeout(() => {
        fetchBusinesses(searchQuery, sortOption);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    } else {
      fetchBusinesses('', sortOption);
    }
  }, [searchQuery, sortOption]);

  return (
      <main>
        <Header />
        <Container size={1440}>
          <Container fluid className={classes.searchBox}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <Group>
              <Select
                  placeholder="Sort By"
                  value={sortOption}
                  onChange={(value) => setSortOption(value || '')}
                  data={[
                    { value: 'name', label: 'A-Z' },
                    { value: 'inverse_name', label: 'Z-A' },
                    { value: 'min_invest', label: 'Minimum investment (Low -> High)' },
                    { value: 'inverse_min_invest', label: 'Minimum investment (High -> Low)' },
                    { value: 'totalInvestment', label: 'Total Raised' },
                    { value: 'investors', label: 'Number of Investors' },
                  ]}
                  size="sm"
                  style={{ marginLeft: '15px', width: '200px' }}
              />
              <Button size='sm' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}
                      onClick={() => window.location.href = "/investor/dashboard"}>
                <NavItem label="Dashboard" link="/investor/dashboard"/>
              </Button>
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

