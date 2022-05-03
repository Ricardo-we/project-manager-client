import { BaseModal } from "./Modal";
import { Button } from "@mui/material";
import { ContainerFlex } from "./styled-components/ContainerFlex";

export const AlertModal = ({ children, open, onClose, onConfirm }) => {
    return (
        <BaseModal open={open} onClose={onClose}>
            {children}
            <ContainerFlex width="100%">
                <Button variant="contained" color="error" onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="info" onClick={onConfirm}>Confirm</Button>
            </ContainerFlex>
        </BaseModal>
    )
}