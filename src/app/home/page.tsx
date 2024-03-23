"use client";
import { Box, CircularProgress, Fab } from "@mui/material";
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


    useEffect(() => {
        getImages()
    }, [])

    const getImages = () => {
        axios.get('/api/image').then((res) => {
            if (res.status === 200) {
                // const previews = res?.data?data?.map((file) => URL.createObjectURL(file));
                setFilePreviews(res?.data?.data);
            }
        }).catch((err) => console.log(err))
        setUploading(false)
    }

    const handleFileChange = async (e: Event) => {
        setUploading(true);
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        console.log("file change")

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
                console.log('Files uploaded successfully', res);
                getImages();

            })

        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ width: "100%", p: "5px" }}>
            { uploading ?  <CircularProgress size={20} sx={{color :"#fff"}}/> :
             filePreviews?.length ? <ImageMasonry images={filePreviews} /> : "No image found"}

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={uploading ? 
                <CircularProgress size={20} sx={{color :"#fff"}}/>
                :   <AddAPhoto sx={{ margin: "0px" }} />}
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
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e)} />

            </Button>

        </Box>
    );
}

export default Page;