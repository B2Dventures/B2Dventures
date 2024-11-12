import { InvestorRequestDetail } from "@/components/RequestDetails/InvestorRequestDetail";
import {AdminHeader} from "@/components/Header/AdminHeader";
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";
import React from "react";

async function fetchInvestor(id: string) {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer ? 'http://localhost:3000' : '';

    const response = await fetch(`${baseUrl}/api/admin/investor/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error("Failed to fetch investor data");
    }

    return response.json();
}

export default async function InvestorDetailPage({ params }: { params: { id: string } }) {
    const investor = await fetchInvestor(params.id); // Fetch the investor data based on the URL parameter `id`

    return (
        <main>
            <AdminHeader/>
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Investor Detail</h1>
            </main>
            <InvestorRequestDetail investor={investor} />
        </main>
    );
}
