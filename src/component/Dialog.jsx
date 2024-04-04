import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const DialogBox = ({open, setOpen, type, post, action}) => {
    const [textField1Value, setTextField1Value] = useState('');
    const [textField2Value, setTextField2Value] = useState('');
    useEffect(()=>{
        setTextField1Value('')
        setTextField2Value('')
        if(type == 'update'){
            console.log(true)
            setTextField1Value(post.title)
            setTextField2Value(post.content)
        }else{
            setTextField1Value('')
            setTextField2Value('')
        }
    },[type, open])
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onAction = () => {
        const title = textField1Value;
        const content = textField2Value
        action(type, title, content)
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="textField1"
                        label="Title"
                        type="text"
                        fullWidth
                        value={textField1Value}
                        onChange={(e) => setTextField1Value(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="textField2"
                        label="Content"
                        type="text"
                        fullWidth
                        value={textField2Value}
                        onChange={(e) => setTextField2Value(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {type ==="add" ? <Button onClick={onAction} color="primary">
                        Add
                    </Button> : <Button onClick={onAction}>Update</Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogBox;
