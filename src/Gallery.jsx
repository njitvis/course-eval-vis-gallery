import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column'
};

const Gallery = (props) => {
  const [open, setOpen] = React.useState(false);
  const [itemSelected, setSelected] = React.useState([]);

  const handleOpen = (item) => {
    setOpen(true);
    setSelected(item);
  }
  const handleClose = () => {
      setOpen(false);
      setSelected([]);
  }
  const handleClick = (event) => {
    setOpen(false);
    setSelected([]);
  }


  return (
    <div id="gallery-container">
        {props.data.length > 0 ? 
          <div>
            <Box sx={{ width: '75vw', height: '80vh', m:0, overflow:'auto'}}> 
                <ImageList variant="masonry" cols={3} gap={10}>
                  {props.data.map((item) => {
                    return(
                      <ImageListItem key={item.id} sx={{p: 3, overflow: 'hidden'}} >
                        <img
                            src={import.meta.env.BASE_URL + "assets/images/" +`${item.file_name}?w=248&fit=crop&auto=format`}
                            srcSet={import.meta.env.BASE_URL + "assets/images/" +`${item.file_name}?w=248&fit=crop&auto=format`}
                            alt={item.file_name}
                            loading="lazy"
                            onClick = {() => handleOpen(item)}
                        />
                      </ImageListItem>
                    )})}
                </ImageList>
            </Box> 
            <Modal open={open} onClose={handleClose} onClick= {handleClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <div style={{display: 'flex', 'justify-content': 'right', 'float': 'right'}}>
                  <CancelPresentationIcon />
                </div>
                <img
                  src={import.meta.env.BASE_URL + "assets/images/" + `${itemSelected.file_name}?w=248&fit=crop&auto=format`}
                  srcSet={import.meta.env.BASE_URL + "assets/images/" + `${itemSelected.file_name}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={itemSelected.description}
                  loading="lazy"
                  style={{maxWidth: '100%', maxHeight: '100%', padding: '15px', whiteSpace: 'unset' }}
               />
              </Box>
            </Modal>
          </div>
        : null}
    </div>
  )
}

export default Gallery;
