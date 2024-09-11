"use client";

import {Header} from "@/components/Header/Header";
import { React, useState } from 'react';
import {DateInput} from '@mantine/dates'
import { Container, TextInput, Textarea, NumberInput, Select, FileInput, Button, Group, Text, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

export default function Home() {
  const [value, setValue] = useState<Date | null>(null);
  return (
  <main>
    <Header/>
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
          value={value}
          onChange={setValue}
          label="Start date"
          placeholder="Enter your start date"
       />
        <DateInput
          value={value}
          onChange={setValue}
          label="End date"
          placeholder="Enter your end date"
       />
      </Group>
      <FileInput
        label="Upload Campaign Image"
        placeholder="Upload an image"
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
