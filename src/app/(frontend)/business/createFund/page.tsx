"use client";

import React, { useState } from "react";
import {
    Container,
    TextInput,
    Textarea,
    NumberInput,
    Button,
    Group,
    Text,
    TagsInput
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Header } from "@/components/Header/Header";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useRouter } from "next/navigation";
import { UploadMultiple } from "@/components/Upload/Upload";

export default function CampaignForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: undefined as number | undefined,
    minimumInvest: undefined as number | undefined,
    category: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    highlight: "",
    product: "",
    opportunity: "",
    images: [] as string[],
  });

  const router = useRouter();

  const handleInputChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadComplete = (urls: string[]) => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/campaign/createFund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        notifications.show({
          title: "Campaign Created!",
          message: "Your campaign has been submitted and is awaiting approval.",
          color: "green",
        });

        setTimeout(() => {
          router.push("/business");
        }, 750);
      } else {
        notifications.show({
          title: "Error",
          message: result.error || "An error occurred while creating the campaign.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      notifications.show({
        title: "Error",
        message: "Failed to submit campaign.",
        color: "red",
      });
    }
  };

  return (
    <main>
      <Header />
      <Container size="md" my="xl">
        <Text align="center" size="xl" weight={700} mb="md">
          Create your Campaign
        </Text>

        <TextInput
          label="Title"
          placeholder="Enter the title of your campaign"
          value={form.title}
          onChange={(event) => handleInputChange("title", event.currentTarget.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Short detail to describe your campaign"
          value={form.description}
          onChange={(event) => handleInputChange("description", event.currentTarget.value)}
          minRows={4}
          required
          mt="md"
        />

        <NumberInput
          label="Goal"
          placeholder="Enter the goal amount of your fund in USD"
          value={form.goal}
          onChange={(value) => handleInputChange("goal", value)}
          required
          mt="md"
        />

        <NumberInput
          label="Minimum Investment"
          placeholder="Enter the minimum amount of your campaign"
          value={form.minimumInvest}
          onChange={(value) => handleInputChange("minimumInvest", value)}
          required
          mt="md"
        />

          <TagsInput
              label="Category"
              placeholder="Select a category for your campaign"
              data={["Technology", "Health", "Education", "Environment", "Game", "Food"]}
              value={form.category}
              onChange={(value) => handleInputChange("category", value)}
              required
              mt="md"
              acceptValueOnBlur
          />


        <Group mt="md" grow>
          <DateTimePicker
              clearable
              defaultValue={new Date()}
            value={form.startDate}
            onChange={(value) => handleInputChange("startDate", value)}
            label="Start date"
            placeholder="Enter your start date"
          />
          <DateTimePicker
              clearable
              defaultValue={new Date()}
            value={form.endDate}
            onChange={(value) => handleInputChange("endDate", value)}
            label="End date"
            placeholder="Enter your end date"
          />
        </Group>

        <UploadMultiple onUploadComplete={handleUploadComplete} />

        {form.images.length > 0 && (
          <div>
            <Text size="sm" mt="md">
              Uploaded Images:
            </Text>
            <Group mt="sm">
              {form.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              ))}
            </Group>
          </div>
        )}

        <Textarea
          label="Highlight"
          placeholder="Describe the highlights of your campaign"
          value={form.highlight}
          onChange={(event) => handleInputChange("highlight", event.currentTarget.value)}
          styles={{ input: { height: 150 } }}
          required
          mt="md"
        />

        <Textarea
          label="Product"
          placeholder="Describe your product"
          value={form.product}
          onChange={(event) => handleInputChange("product", event.currentTarget.value)}
          styles={{ input: { height: 150 } }}
          required
          mt="md"
        />

        <Textarea
          label="Opportunity"
          placeholder="Describe the opportunity"
          value={form.opportunity}
          onChange={(event) => handleInputChange("opportunity", event.currentTarget.value)}
          styles={{ input: { height: 150 } }}
          required
          mt="md"
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
