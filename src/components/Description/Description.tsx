import React from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';

interface DescriptionProps {
    id: string;
}
const markdownContent = "## Highlights\n - Largest platform  \n - Biggest user base"


const Description: React.FC<DescriptionProps> = ({ id }) => {
    return (
        <div style={styles.card}>
            <MarkdownRenderer content={markdownContent} />
        </div>
    );
};

// Define some basic styles
const styles = {
    card: {
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '600px',
    },
};

export default Description;
