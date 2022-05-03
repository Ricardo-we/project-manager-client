import { Modal, IconButton } from "@mui/material"
import Box from '@mui/material/Box';
import { Close } from '@mui/icons-material';

const styles = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0
    }
};

export const BaseModal = ({ open, onClose, children }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={styles.box}>
                <IconButton sx={styles.closeButton} onClick={onClose}>
                    <Close/>
                </IconButton>
                {children}
            </Box>
      </Modal>
    )
}