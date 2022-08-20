import React, { useEffect, useRef, useState } from "react";

function ImageUpload(props){

    const [file,setFile]=useState();
    const [previewUrl,setpreviewUrl]=useState();
    const filePickerRef=useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload=()=>{
            setpreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    function pickedHandler(event){
        let pickedFile;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
            props.setData((prev)=>{
                return{...prev,image:pickedFile};
            })
        }
    }

    function pickedImageHandler(){
        filePickerRef.current.click();
    }

    return(
        <div className="form-controll">
            <input
            id={props.id}
            ref={filePickerRef}
            style={{display:"none"}}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
             />
             <div className="image-upload">
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl &&(
                        <div className="center">
                            <button className="image-upload-button" onClick={pickedImageHandler}>Add NFT</button>
                        </div>
                    )}
                </div>
                <div>
                    {previewUrl && (
                        <div className="center">
                            <button className="image-upload-button" onClick={pickedImageHandler}>Change</button>
                        </div>
                    )}
                </div>
             </div>
        </div>
    )

}

export default ImageUpload;