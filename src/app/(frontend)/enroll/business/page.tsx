'use client';

import React, { useState } from 'react';
import { Container, TextInput, Textarea, NumberInput, Select, Button, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header/Header';
import { ImageDrop } from '@/components/ImageDrop/ImageDrop';

export default function Home() {
  const [formData, setFormData] = useState({
    businessName: '',
    founderFirstName: '',
    founderLastName: '',
    email: '',
    phoneNumber: '',
    marketCap: '',
    companyAddress: '',
    businessDetail: '',
    industry: '',
    logo: null,
    license: null,
    registrationCer: null,
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (files: File[]) => {
    console.log('Files dropped:', files);
    // Handle file uploads and set the appropriate fields (logo, license, registrationCer)
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/enroll/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( formData ),
      });

      const data = await response.json();

      if (data.success) {
        notifications.show({
          title: 'Registration Sent!',
          message: "Your registration has been submitted. Please wait for approval.",
        });
        setTimeout(() => {
          router.push('/'); // Redirect to home page
        }, 2000);
      } else {
        notifications.show({
          title: 'Error!',
          message: data.error,
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      notifications.show({
        title: 'Error!',
        message: 'There was an error submitting your registration.',
        color: 'red',
      });
    }
  };

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text align="center" size="xl" weight={700} mb="md">Fill your information</Text>
        <TextInput
          label="Business name"
          placeholder="Enter your business name"
          required
          mt="md"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Founder Firstname"
          placeholder="Enter the firstname of the business founder"
          required
          mt="md"
          name="founderFirstName"
          value={formData.founderFirstName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Founder Lastname"
          placeholder="Enter the lastname of the business founder"
          required
          mt="md"
          name="founderLastName"
          value={formData.founderLastName}
          onChange={handleInputChange}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          mt="md"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextInput
          label="Phone number"
          placeholder="Enter your phone number"
          required
          mt="md"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <NumberInput
          label="Market capitalization"
          placeholder="Enter the market capitalization of your business"
          required
          mt="md"
          name="marketCap"
          value={formData.marketCap}
          onChange={(value) => setFormData((prev) => ({ ...prev, marketCap: value }))}
        />
        <Textarea
          label="Company address"
          placeholder="Enter the address of your company"
          required
          mt="md"
          minRows={4}
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
        />
        <Textarea
          label="Business detail"
          placeholder="Describe your business in brief"
          required
          mt="md"
          minRows={4}
          name="businessDetail"
          value={formData.businessDetail}
          onChange={handleInputChange}
        />
        <Select
          label="Industry"
          placeholder="Select the industry related to your business"
          data={['Technology', 'Health', 'Education', 'Entertainment', 'Sport', 'Game']}
          required
          mt="md"
          name="industry"
          value={formData.industry}
          onChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
        />
        <ImageDrop
          onDrop={handleDrop}
          dropText="Drop your certification of business registration here"
          descriptionText="Your certification must contain a number and the start date. Each file should not exceed 5mb."
        />
        <Group position="center" mt="xl">
          <Button color="green" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Container>
    </main>
  );
}
