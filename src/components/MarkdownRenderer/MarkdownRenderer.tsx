import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Enables GitHub-Flavored Markdown for tables, task lists, etc.
import { TypographyStylesProvider } from '@mantine/core'; // Optional if you use Mantine for custom styling

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <TypographyStylesProvider>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </TypographyStylesProvider>
    );
};

export default MarkdownRenderer;
