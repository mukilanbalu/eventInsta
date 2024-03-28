import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { CardMedia, Checkbox } from '@mui/material';

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



  const handleImageSelection = (image) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(image)) {
        return prevSelected.filter(selectedImage => selectedImage !== image);
      } else {
        return [...prevSelected, image];
      }
    });
  }

  return (
    <Box sx={{ width: " 100%" }}>
      <Masonry columns={3} spacing={2}>
        {images.map((item, index) => (
          <div key={index} style={{ position: "relative", cursor: "pointer" }} onClick={() => handleImageSelection(item)}>
            <Checkbox
              checked={selectedImages.includes(item)}
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
              <img
                // className='photo-thumbnail'
                srcSet={`${item.url}`}
                src={`${item.url}`}
                alt={item.name}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
              />
              :

              <CardMedia
                component="video"
                image={item.url}
                title='title'
                controls
                src={`${item.url}`}
              />
            }
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
