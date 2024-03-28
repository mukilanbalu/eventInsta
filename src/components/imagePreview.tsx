import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

const FullscreenImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
});

const ImagePreview = ({ item }) => {
    const [open, setOpen] = React.useState(false);

    const toggleFullscreen = () => {
        setOpen(!open);
    };

    return (
        <>
            <img
                src={item.url}
                alt={item.name}
                onClick={toggleFullscreen}
                style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    cursor: 'pointer',
                    width: '100%',
                }}
            />
            <Dialog open={open} onClose={toggleFullscreen} maxWidth="lg" fullWidth
                sx={{ maxHeight: "calc(100% - 78px)" }}>
                <DialogContent sx={{ p: 0 }}>
                    <FullscreenImage src={item.url} alt={item.name} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImagePreview;
