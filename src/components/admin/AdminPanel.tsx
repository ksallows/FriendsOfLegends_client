import { useState } from 'react';
import { Tabs, Grid, Paper } from '@mantine/core';

interface AdminPanelProps {
    app_sessionToken: string | null
}

function AdminPanel({ app_sessionToken }: AdminPanelProps) {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <Grid gutter={0} sx={{ marginTop: '2rem' }}>
            <Grid.Col xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                <Paper sx={{ backgroundColor: '#1f2023', marginBottom: '2rem' }} padding='md' shadow='sm' withBorder>
                    <Tabs color='orange' active={activeTab} onTabChange={setActiveTab}>
                        <Tabs.Tab label="Reset Password">Reset Password</Tabs.Tab>
                        <Tabs.Tab label="Delete Comments">Second tab content</Tabs.Tab>
                    </Tabs>
                </Paper>
            </Grid.Col>
        </Grid>
    );
}

export default AdminPanel;