'use client';

import React, { useState } from 'react';
import {
  Container,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Text,
  TagsInput,
  Image,
  Box
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header/Header';
import { UploadSingle } from "@/components/Upload/Upload";

interface FormData {
  businessName: string;
  founderFirstName: string;
  founderLastName: string;
  email: string;
  phoneNumber: string;
  marketCap: string | number;
  companyAddress: string;
  businessDetail: string;
  industry: string[];
  logo: string | null;
  license: string | null;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    founderFirstName: '',
    founderLastName: '',
    email: '',
    phoneNumber: '',
    marketCap: '',
    companyAddress: '',
    businessDetail: '',
    industry: [] as string[],
    logo: null,
    license: null,
  });

  // Image preview state
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndustryChange = (value: string[]) => {
    setFormData((prev) => ({ ...prev, industry: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/enroll/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notifications.show({
          title: 'Registration Sent!',
          message: "Your registration has been submitted. Please wait for approval.",
        });
        setTimeout(() => {
          router.push('/');
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

  const handleLogoUploadComplete = (url: string) => {
    setFormData((prev) => ({ ...prev, logo: url }));
    setLogoPreview(url); // Set the preview for logo
  };

  const handleLicenseUploadComplete = (url: string) => {
    setFormData((prev) => ({ ...prev, license: url }));
    setLicensePreview(url); // Set the preview for license
  };

  return (
      <main>
        <Header />
        <Container size="md" my="xl">
          <Text size="xl" mb="md">Fill your information</Text>

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
          <TagsInput
              label="Category"
              placeholder="Select a category for your campaign"
              data={["Technology", "Health", "Education", "Environment", "Game", "Food", "Sport"]}
              value={formData.industry}
              onChange={handleIndustryChange}
              required
              mt="md"
              acceptValueOnBlur
          />

          <Text>Business Logo</Text>
          <UploadSingle onUploadComplete={handleLogoUploadComplete} />
          {logoPreview && (
              <Box mt="md" style={{ maxWidth: 200 }}>
                <Text size="sm" mt="md">Logo Image Preview:</Text>
                <Image src={logoPreview} alt="Business Logo Preview" />
              </Box>
          )}

          <Text>Business License</Text>
          <UploadSingle onUploadComplete={handleLicenseUploadComplete} />
          {licensePreview && (
              <Box mt="md" style={{ maxWidth: 200 }}>
                <Text size="sm" mt="md">License Image Preview:</Text>
                <Image src={licensePreview} alt="Business License Preview" />
              </Box>
          )}

          <Group mt="xl">
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Container>
      </main>
  );
}
