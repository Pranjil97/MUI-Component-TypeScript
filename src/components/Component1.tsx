import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

const Component1: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'body', headerName: 'Body', flex: 1 },
    ];

    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={posts} columns={columns} />
            </div>
        </>
    );
};

export default Component1;
