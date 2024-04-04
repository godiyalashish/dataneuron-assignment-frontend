import React, { useRef, useEffect,useState } from "react";
import "./App.css";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import axios from "axios";
import { Box, Button } from "@mui/material";
import DialogBox from "./component/Dialog";
import MultiActionAreaCard from "./component/card";

function App() {
  const [post,setPost] = useState(null)
  const [openDialog, setOpenDialog] = useState(false);
  const [DialogBoxType, setDialogBoxType] = useState('add')
  const [count, setCount] = useState(0)

  const getLatestPost = async () => {
    const resp = await axios.get('https://dataneuron-assignment-backend-g0ud.onrender.com/posts/latest')
    console.log(resp)
    setPost(resp.data)
  }

  useEffect(()=>{
    getLatestPost()
  }, [])

  const showDialog = (type) => {
    setDialogBoxType(type)
    setOpenDialog(true)
  }

  const onAction = async (type, title, content)=>{
    
    if(type == 'add'){
      if(!title || !content){
        alert("invalid inputs")
        return
      }
      try{
        setCount(count=> count+1)
        const resp = await axios.post('https://dataneuron-assignment-backend-g0ud.onrender.com/posts', {
        title,
        content
      })
      if(resp.status != 201){
        alert('failed to create post')
      }
      }catch(e){
        alert("failed to create post")
      }
      

    }else{
      if(!title || !content){
        alert("invalid inputs")
        return
      }
      try {
        setCount(count=> count+1)
        const resp = await axios.put(`https://dataneuron-assignment-backend-g0ud.onrender.com/posts/${post._id}`, {
          title,
          content
        })
        if(resp.status != 200){
          alert('failed to update post')
        }
      } catch (error) {
        alert('failed to update post')
      }
    }
    await getLatestPost();
    setOpenDialog(false)
  }
  return (
    <PanelGroup direction="horizontal">
      <DialogBox open={openDialog} setOpen={setOpenDialog} type={DialogBoxType} post={post} action={(type, title, content)=>onAction(type, title, content)}/>
      <Panel>
        <PanelGroup direction="vertical">
          <Panel>
            <PanelGroup direction="horizontal">
              <Panel>
              <PanelGroup direction="horizontal">
              <Panel defaultSize={2} minSize={2}></Panel>
              <PanelResizeHandle />
              <Panel>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={2} minSize={2}></Panel>
                  <PanelResizeHandle />
                  <Panel className="panel">
                    <MultiActionAreaCard/>
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
              </Panel>
              <PanelResizeHandle />
              <Panel>
              <PanelGroup direction="horizontal">
              
              
              <Panel>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={2} minSize={2}></Panel>
                  <PanelResizeHandle />
                  <Panel className="panel">
                  <MultiActionAreaCard/>
                  </Panel>
                </PanelGroup>
              </Panel>
              <PanelResizeHandle />
              <Panel defaultSize={2} minSize={2}></Panel>
            </PanelGroup>
              </Panel>
            </PanelGroup>

            


          </Panel>
          <PanelResizeHandle />
          <Panel>
          <PanelGroup direction="horizontal">
              <Panel defaultSize={1} minSize={1}></Panel>
              <PanelResizeHandle />
              <Panel>
                <PanelGroup direction="vertical">
                  <Panel className="panel">
                    <Box display="flex" height="100%" width='100%' justifyContent='space-between' padding='1rem' columnGap='1rem'>
                      <Box display='flex' flexDirection='column' justifyContent="space-around">
                          {post && <>
                            <Box><strong>Title:</strong><br/>{post.title}</Box>
                            <Box><strong>Content:{" "}</strong><br />{post.content}</Box>
                          </>}
                      </Box>
                      <Box display='flex' width='20%' flexDirection='column' justifyContent='center' alignItems='center' rowGap='1rem'>
                      <Button variant="contained" onClick={()=>showDialog('add')}>Add</Button>
                      <Button variant="contained" onClick={post ? ()=>showDialog('update'): ()=>{}}>Update</Button>
                      <h2>Count:{" "} {count}</h2>
                      </Box>
                    </Box>
                  </Panel>
                  <PanelResizeHandle />
                  <Panel defaultSize={1} minSize={1}></Panel>
                </PanelGroup>
              </Panel>
              <PanelResizeHandle />
              <Panel defaultSize={1} minSize={1}></Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </Panel>
      
    </PanelGroup>
  );
}

export default App;
