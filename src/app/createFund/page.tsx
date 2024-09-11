"use client";

import { Header } from "@/components/Header/Header";
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import { Container, TextInput, Textarea, NumberInput, Select, FileInput, Button, Group, Text } from '@mantine/core';

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text align="center" size="xl" weight={700} mb="md">Create your Campaign</Text>
        <TextInput
          label="Title"
          placeholder="Enter the title of your campaign"
          required
        />
        <Textarea
          label="Description"
          placeholder="Describe your campaign in detail"
          minRows={4}
          required
          mt="md"
        />
        <NumberInput
          label="Goal"
          placeholder="Enter the goal amount of your fund in USD"
          required
          mt="md"
        />
        <Select
          label="Category"
          placeholder="Select a category"
          data={['Technology', 'Health', 'Education', 'Environment']}
          required
          mt="md"
        />
        <Group mt="md" grow>
          <DateInput
            value={startDate}
            onChange={setStartDate}
            label="Start date"
            placeholder="Enter your start date"
            required
          />
          <DateInput
            value={endDate}
            onChange={setEndDate}
            label="End date"
            placeholder="Enter your end date"
            required
          />
        </Group>
        <FileInput
          label="Upload an Image"
          placeholder="Upload your Campaign Image"
          accept="image/*"
          mt="md"
        />
        <Group position="center" mt="xl">
          <Button color="green">Submit</Button>
        </Group>
      </Container>
    </main>
  );
}
