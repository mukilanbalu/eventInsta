"use client";
import { Box, CircularProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from "axios";
import ImageMasonry from "./masonry";
import { AddAPhoto, DownloadRounded } from "@mui/icons-material";
import JSZip from "jszip";
import { saveAs } from "file-saver";


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
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({
        open: false,
        text: ""
    })
    const [selectedImages, setSelectedImages] = React.useState([]);


    useEffect(() => {
        getImages()
    }, [])

    const getImages = () => {
        setLoading(true)
        setFilePreviews([]);

        axios.get('/api/image').then((res) => {
            if (res.status === 200) {
                setFilePreviews(res?.data?.data);
            }
        }).catch((err) => console.log(err)).finally(() => {
            setLoading(false)
        })
    }

    const handleFileChange = async (e: Event) => {
        e.stopPropagation();
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        setUploading(true);

        // Upload files immediately upon selection
        try {

            const formData = new FormData();
            files.forEach((file) => formData.append('file', file));

            axios.post('/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                if (res.status == 200) {
                    setStatus({ open: true, text: 'File uploaded successfully' })
                    setUploading(false);
                    setTimeout(() => {
                        getImages();;
                    }, "3000");

                } else {
                    setStatus({ open: true, text: 'File upload failed' })
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

    const handleDownload = async () => {
        setDownloading(true);
        const zip = new JSZip();
        await Promise.allSettled(selectedImages.map(async file => {
            try {
                const response = await fetch(file.url);
                const blob = await response.blob();
                zip.file(file.name, blob);
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }));
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'downloaded_files.zip');
        setDownloading(false)
    }

    return (
        <Box sx={{ width: "100%", p: "5px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>

            {loading ? <CircularProgress size={40} sx={{ color: "#fff" }} /> :
                <ImageMasonry images={filePreviews}
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                />}

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={
                    uploading ?
                        <CircularProgress size={25} sx={{ color: "#fff" }} />
                        : <AddAPhoto sx={{ margin: "0px" }} />
                }
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
            {selectedImages.length > 0 && <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={
                    downloading ?
                        <CircularProgress size={25} sx={{ color: "#fff" }} />
                        : <DownloadRounded sx={{ margin: "0px" }} />
                }
                disabled={downloading}
                onClick={handleDownload}
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    right: "100px",
                    borderRadius: "50%",
                    height: "60px",
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

            </Button>
            }
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