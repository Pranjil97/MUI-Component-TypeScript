import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FirstPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Save user details to local storage
        localStorage.setItem('name', formData.name);
        localStorage.setItem('phone', formData.phone);
        localStorage.setItem('email', formData.email);
        // Navigate to the second page
        navigate('/second-page');
    };

    const isFormDataEmpty = !formData.name || !formData.phone || !formData.email;

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ mt: 8, p: 4, border: '1px solid #ccc', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>User Information Form</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Phone number"
                        variant="outlined"
                        fullWidth
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{ mb: 3 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isFormDataEmpty}>
                        Submit
                    </Button>
                    {isFormDataEmpty && <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>Please enter all details before submitting.</Typography>}
                </form>
            </Box>
        </Container>
    );
};

export default FirstPage;
