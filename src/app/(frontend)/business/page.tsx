'use client';

import { Header } from "@/components/Header/Header";
import { CampaignTable } from "@/components/CampaignTable/CampaignTable";
import { Button, Container, Divider, Group, Text, Box } from '@mantine/core';
import classes from "./business.module.css";
import { NavItem } from "@/components/Header/NavItem/NavItem";
import { LuCheckCircle, LuDollarSign, LuUsers } from "react-icons/lu";
import { baiSemiBold, baiBold, arimoRegular } from '@/app/(frontend)/styles/fonts';
import { useEffect, useState } from "react";
import { useUser } from '@clerk/clerk-react';
import {CampaignData} from "types/api";
import {
    SignInButton
} from '@clerk/nextjs';

function calculateTotals(data: CampaignData[]) {
    if (data.length === 0) {
        const totalRaised = 0;
        const totalInvestors = 0;
        const campaignCount = 0;
        return { totalRaised, totalInvestors, campaignCount };
    }
    const totalRaised = data.reduce((sum, campaign) => sum + campaign.raised, 0);
    const totalInvestors = data.reduce((sum, campaign) => sum + campaign.investors, 0);
    const campaignCount = data.length;
    return { totalRaised, totalInvestors, campaignCount };
}

export default function BusinessPage() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [fetchedData, setFetchedData] = useState<CampaignData[]>([]);
    const [loading, setLoading] = useState(true);
    const role = user?.publicMetadata?.role;
    const id = user?.publicMetadata?.id;

    useEffect(() => {
        const fetchData = async () => {
            if (isSignedIn && role === "business") {
                setLoading(true); // Set loading to true before fetching
                const data = { id: id };

                try {
                    const res = await fetch("http://localhost:3000/api/business", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });

                    if (!res.ok) {
                            throw new Error(`Failed to fetch: ${res.status}`);
                    }

                    const responseData = await res.json();
                    setFetchedData(responseData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    // Optionally, you can set an error state here to show an error message to the user
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            }
        };
        fetchData(); // Call the function to fetch data
    }, [isSignedIn, role, id]); // Dependency array should include relevant dependencies

    if (!isLoaded) {
        return null; // Handle loading state
    }

    const totals = calculateTotals(fetchedData);

    return (
        <main className={classes.main}>
            <Header/>
            <Container size={1440} className={classes.container}>
                {role === "business" ? (
                    <main>
                        <div className={baiSemiBold.className}>
                            <h1 className={classes.topic}>All Campaigns list</h1>
                        </div>
                        <div className={classes.table}>
                            <CampaignTable data={fetchedData} loading={loading}/>
                        </div>
                    </main>
                ) : role === "investor" || role === "guest" ? (  // for non-business role
                    <main>
                            <div className={baiBold.className}>
                                <Text
                                fw={750}
                                component="span"
                                className={classes.mediumtext}
                                >
                                    This page's for
                                </Text>
                            </div>
                            <div className={baiBold.className}>
                                <Text
                                variant="gradient"
                                gradient={{from: '#000000', to: 'goldenrod', deg: 90}}
                                fw={1000}
                                component="span"
                                className={classes.bigtext}
                                >
                                    Businessman
                                </Text>
                            </div>
                            <div className={arimoRegular.className}>
                                <Text className={classes.smalltext}>
                                    If you’re interested in having your business become part of B2D Venture.
                                </Text>
                                <Text className={classes.smalltext}>
                                    Please register here
                                </Text>
                                <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}
                                        onClick={() => window.location.href = "/enroll/business"}>
                                    <NavItem label="Business Enrollment" link="/enroll/business"/>
                                </Button>
                            </div>

                    </main>
                ) : (
                    <main>
                        <main className={baiBold.className}>
                            <Text
                            variant="gradient"
                            gradient={{from: '#000000', to: 'goldenrod', deg: 90}}
                            fw={1000}
                            component="span"
                            className={classes.bigtext}
                            >
                                You have not logged in to our application yet
                            </Text>
                        </main>
                        <main className={arimoRegular.className}>
                            <Text className={classes.smalltext}>
                                Please login here
                            </Text>
                            <SignInButton>
                                <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}>
                                    Login
                                </Button>
                            </SignInButton>
                        </main>
                    </main>
                )}
            </Container>
            <footer className={classes.footer}>
                <Container className={classes.inner} size={1440}>
                    <Group>
                        <div className={classes.box}>
                        <LuDollarSign size={50}/>
                            <Text className={classes.name}>Total Fund Raised</Text>
                            <Text className={classes.number}>$ {totals.totalRaised}</Text>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className={classes.box}>
                            <LuUsers size={50}/>
                            <Text className={classes.name}>Total Investors</Text>
                            <Text className={classes.number}>{totals.totalInvestors}</Text>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className={classes.box}>
                            <LuCheckCircle size={50}/>
                            <Text className={classes.name}>Total Campaigns</Text>
                            <Text className={classes.number}>{totals.campaignCount}</Text>
                        </div>
                        <Divider orientation="vertical"/>
                    </Group>
                    <Group gap={20} visibleFrom="xs">
                        <Button size='md' variant="gradient" gradient={{from: 'yellow', to: 'gold', deg: 90}}
                                onClick={() => window.location.href = "http://localhost:3000/business/createFund"}>
                            <NavItem label="Create Fundraising" link="http://localhost:3000/business/createFund"/>
                        </Button>
                    </Group>
                </Container>

            </footer>
        </main>
    );

}
