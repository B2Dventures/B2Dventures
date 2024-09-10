const CampaignPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;  // params = business/{id}

    return (
        <div>
            <h1>Campaign ID: {id}</h1>
        </div>
    );
};

export default CampaignPage;
