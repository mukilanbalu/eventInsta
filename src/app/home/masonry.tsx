/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { CardMedia, Checkbox, Dialog, DialogContent } from '@mui/material';
import ImagePreview from '@/components/imagePreview';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry({ images, selectedImages, setSelectedImages }) {

  const [open, setOpen] = React.useState(false);

  const handleImageSelection = (image) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(image)) {
        return prevSelected.filter(selectedImage => selectedImage !== image);
      } else {
        return [...prevSelected, image];
      }
    });
  }

  const videoRef = React.useRef(null);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  };


  const FullscreenImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  });

  const toggleImageFullscreen = () => {
    setOpen(!open);
  }

  return (
    <Box sx={{ width: " 100%" }}>
      <Masonry columns={3} spacing={2}>
        {images.map((item, index) => (
          <div key={index} style={{ position: "relative", cursor: "pointer" }} onClick={toggleImageFullscreen}
          >
            <Checkbox
              checked={selectedImages.includes(item)}
              onClick={() => handleImageSelection(item)}
              sx={{
                position: "absolute", right: "5px", color: "#fff",
                background: "#3e3e3e",
                boxShadow: "0px 0px 8px 5px rgba(82,82,82,1)",
                width: "20px",
                height: "20px",
                top: " 10px",
                '&.Mui-checked': {
                  color: "#fff"
                }
              }}
            />
            {item.fileType === "image" ?
              // <>
              //    <img
              //     // className='photo-thumbnail'
              //     srcSet={`${item.url}`}
              //     src={`${item.url}`}
              //     alt={item.name}
              //     loading="lazy"
              //     style={{
              //       borderBottomLeftRadius: 4,
              //       borderBottomRightRadius: 4,
              //       display: 'block',
              //       width: '100%',
              //     }}
              //   />
              //   <Dialog open={open} onClose={toggleFullscreen} maxWidth="lg" fullWidth>
              //     <DialogContent>
              //       <FullscreenImage src={item.url} alt={item.name} />
              //     </DialogContent>
              //   </Dialog>
              // </> 
              <ImagePreview item={item} />
              :

              // <CardMedia
              //   component="video"
              //   image={item.url}
              //   title='title'
              //   controls
              //   src={`${item.url}`}
              // />

              <CardMedia
                component="video"
                title={item.name}
                controls
                ref={videoRef}
                onClick={toggleFullscreen}
                poster={item.thumbnail}
              >
                <source src={item.url} type={item.mime} />
              </CardMedia>

            }
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
