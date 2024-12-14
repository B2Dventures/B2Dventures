"use client";

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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header/Header';
import { UploadSingle } from "@/components/Upload/Upload";
import classes from "@/app/(frontend)/enroll/enroll.module.css";
import ImagePreview from "@/components/Upload/ImageDisplay";

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

const isValidText = (value: string) => /^[A-Za-z]+$/.test(value);
const isValidPhone = (value: string) => /^\d+$/.test(value);
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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

  const [errors, setErrors] = useState<any>({});
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

  const validateForm = () => {
    const error: any = {};

    if (!formData.businessName) {
      error.businessName = 'Business name is required.';
    }
    if (!formData.founderFirstName || !isValidText(formData.founderFirstName)) {
      error.founderFirstName = 'Founder Firstname is required and should contain only letters.';
    }
    if (!formData.founderLastName || !isValidText(formData.founderLastName)) {
      error.founderLastName = 'Founder Lastname is required and should contain only letters.';
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      error.email = 'Email is required and should be in a proper format (example@example.com).';
    }
    if (!formData.phoneNumber || !isValidPhone(formData.phoneNumber)) {
      error.phoneNumber = 'Phone number is required and should contain only numbers.';
    }
    if (typeof formData.marketCap !== 'number' || formData.marketCap <= 0) {
      error.marketCap = 'Market capitalization is required and should contain only a positive number.';
    }
    if (!formData.companyAddress) {
      error.companyAddress = 'Company address is required.';
    }
    if (!formData.businessDetail) {
      error.businessDetail = 'Business detail is required.';
    }
    if (formData.industry.length === 0) {
      error.industry = 'At least one category is required.';
    }
    if (!formData.logo) {
      error.logo = 'Business logo is required.';
    }
    if (!formData.license) {
      error.license = 'Business license is required.';
    }

    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      notifications.show({
        title: "Incomplete Form",
        message: `Please fill out all required fields.`,
        color: "red",
      });
      return;
    }

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
      window.location.href = '/error';
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
              error={errors.businessName}
          />
          <TextInput
              label="Founder Firstname"
              placeholder="Enter the firstname of the business founder"
              required
              mt="md"
              name="founderFirstName"
              value={formData.founderFirstName}
              onChange={handleInputChange}
              error={errors.founderFirstName}
          />
          <TextInput
              label="Founder Lastname"
              placeholder="Enter the lastname of the business founder"
              required
              mt="md"
              name="founderLastName"
              value={formData.founderLastName}
              onChange={handleInputChange}
              error={errors.founderLastName}
          />
          <TextInput
              label="Email"
              placeholder="Enter your email"
              required
              mt="md"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
          />
          <TextInput
              label="Phone number"
              placeholder="Enter your phone number"
              required
              mt="md"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
          />
          <NumberInput
              label="Market capitalization"
              placeholder="Enter the market capitalization of your business"
              required
              mt="md"
              name="marketCap"
              value={formData.marketCap}
              onChange={(value) => setFormData((prev) => ({
                ...prev,
                marketCap: value
              }))}
              error={errors.marketCap}
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
              error={errors.companyAddress}
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
              error={errors.businessDetail}
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
              error={errors.industry}
          />

          <div className={classes.container}>
            {/* Business Logo Section */}
            <div className={classes.section}>
              <Text>Business Logo (Recommended size: 255x255)</Text>
              {logoPreview ? (
                  <ImagePreview
                      title="Logo Image Preview"
                      imageSrc={logoPreview}
                      onRemove={() => setLogoPreview(null)} // Custom behavior for removing the logo preview
                  />
              ) : (
                  <UploadSingle onUploadComplete={handleLogoUploadComplete}/>
              )}
              {errors.logo && <Text c="red"
                                    mt="xs">{errors.logo}</Text>} {/* Error below logo section */}
            </div>

            {/* Business License Section */}
            <div className={classes.section}>
              <Text>Business License (Recommended size: 800x1024)</Text>
              {licensePreview ? (
                  <ImagePreview
                      title="License Image Preview"
                      imageSrc={licensePreview}
                      onRemove={() => setLicensePreview(null)} // Custom behavior for removing the license preview
                  />
              ) : (
                  <UploadSingle
                      onUploadComplete={handleLicenseUploadComplete}/>
              )}
              {errors.license && <Text c="red"
                                       mt="xs">{errors.license}</Text>} {/* Error below license section */}
            </div>
          </div>


          <Group mt="xl">
            <Button color="green" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Container>
      </main>
  );
}
