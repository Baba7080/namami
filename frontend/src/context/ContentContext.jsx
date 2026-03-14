import React, { createContext, useState, useEffect, useContext } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [pageContent, setPageContent] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchPageContent = async (pageName) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/content/${pageName}`);
            const data = await res.json();
            if (data.success) {
                setPageContent(prev => ({ ...prev, [pageName]: data.data }));
            }
        } catch (err) {
            console.error(`Error fetching ${pageName} content:`, err);
        }
    };

    // Pre-fetch critical global content (like layout/footer)
    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            await fetchPageContent('global');
            setLoading(false);
        };
        fetchInitial();
    }, []);

    // Helper to get specific page content
    const getContent = (pageName) => {
        if (!pageContent[pageName]) {
            fetchPageContent(pageName); // Fetch lazy
            return null; // Return null while loading
        }
        return pageContent[pageName];
    };

    return (
        <ContentContext.Provider value={{ pageContent, getContent, loading, fetchPageContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => useContext(ContentContext);
