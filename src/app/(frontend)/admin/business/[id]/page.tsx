import {AdminHeader} from "@/components/Header/AdminHeader";
import React from "react";
import {baiSemiBold} from "@/app/(frontend)/styles/fonts";
import classes from "@/app/(frontend)/admin/business/business_list.module.css";
import {BusinessRequestDetail} from "@/components/RequestDetails/BusinessRequestDetail";

async function fetchBusiness(id: string) {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer ? 'http://localhost:3000' : '';

    const response = await fetch(`${baseUrl}/api/admin/business/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error("Failed to fetch business data");
    }

    return response.json();
}

export default async function BusinessDetailPage({ params }: { params: { id: string } }) {
    const business = await fetchBusiness(params.id);

    return (
        <main>
            <AdminHeader/>
            <main className={baiSemiBold.className}>
                <h1 className={classes.topic}>Business Detail</h1>
            </main>
            <BusinessRequestDetail business={business}/>
        </main>
    );
}
