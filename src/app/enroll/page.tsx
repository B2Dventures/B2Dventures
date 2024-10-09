'use client';

import { Header } from '@/components/Header/Header';
import { NavItem } from "@/components/Header/NavItem/NavItem";
import { Group, Button, Container } from '@mantine/core';
import classes from './enroll.module.css';

export default function Home() {
  return (
    <main>
      <Header />
      <Container className={classes.Container}>
        <Group gap={100}>
          <Button
            size='lg'
            variant="gradient"
            gradient={{ from: 'goldenrod', to: 'yellow', deg: 90 }}
          >
            <NavItem label="Investor" link="/enroll/investor" />
          </Button>
          <Button
            size='lg'
            variant="gradient"
            gradient={{ from: 'goldenrod', to: 'yellow', deg: 90 }}
          >
            <NavItem label="Business" link="/enroll/business" />
          </Button>
        </Group>
      </Container>
    </main>
  );
}