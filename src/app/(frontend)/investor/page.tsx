import { Header } from "@/components/Header/Header";
import InvestorClient from '@/components/InvestorClient/InvestorClient';
import { Container, Group, Button, Text } from '@mantine/core';
import classes from './investor.module.css';
import { SearchBar } from "@/components/Search/SearchBar";
import { baiSemiBold } from '@/app/(frontend)/styles/fonts'

interface Business {
  id: number;
  name: string;
  description: string;
  image: string;
  totalInvestment: number;
  investors: number;
}

export default async function InvestorPage() {
  const res = await fetch("http://localhost:3000/api/campaign", {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();
  const businesses: Business[] = data.campaignsWithTotalInvestment || [];

  return (
    <main>
      <Header />
      <Container size={1440}>
        <Container fluid className={classes.searchBox}>
          <SearchBar />
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

