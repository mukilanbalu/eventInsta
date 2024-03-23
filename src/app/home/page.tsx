"use client";
import { Box, CircularProgress, Fab, Snackbar } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ImageKit from "imagekit";
import axios from "axios";
import ImageMasonry from "./masonry";
import { Add, AddAPhoto, AddCircleRounded, HdrPlus } from "@mui/icons-material";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})



const Page = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]);
    const [uploading, setUploading] = useState(true);
    const [status, setStatus] = useState({
        open: false,
        text: ""
    })


    useEffect(() => {
        getImages()
    }, [])

    const getImages = () => {
        axios.get('/api/image').then((res) => {
            if (res.status === 200) {
                setFilePreviews(res?.data?.data);
            }
        }).catch((err) => console.log(err))
        setUploading(false)
    }

    const handleFileChange = async (e: Event) => {
        e.stopPropagation();
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // Upload files immediately upon selection
        try {
            setUploading(true);

            const formData = new FormData();
            files.forEach((file) => formData.append('file', file));

            axios.post('/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if (res.status == 200) {
                    setStatus({ open: true, text: 'Files uploaded successfully' })
                    getImages();
                } else {
                    setStatus({ open: true, text: 'Files uploaded failed' })
                }
            })

        } catch (error) {
            setStatus({ open: true, text: 'Files uploaded failed' })

        } finally {
            setUploading(false);
        }
    };

    const handleClose = () => {
        setStatus({ open: false, text: "" })
    }

    return (
        <Box sx={{ width: "100%", p: "5px" , display:"flex", justifyContent:"center", alignItems:"center", minHeight:"80vh" }}>
            
            {uploading ? <CircularProgress size={40} sx={{ color: "#fff" }} /> :
            <ImageMasonry images={filePreviews} /> }

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={uploading ?
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    : <AddAPhoto sx={{ margin: "0px" }} />}
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <VisuallyHiddenInput
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)} />

            </Button>
            {status?.open && <Snackbar
                open={true}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={4000}
                onClose={handleClose}
                message={status?.text}
                
            />}
        </Box>
    );
}

export default Page;