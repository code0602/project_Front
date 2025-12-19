/** @jsxImportSource @emotion/react */
import { use, useState } from "react";
import * as s from "./styles";
import ReactModal from "react-modal";
import Loading from "../common/Loading";
import Select from "react-select";
import { useMeQuery } from "../../queries/usersQueries";
import {IoCloudUploadOutline} from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useRef } from "react";
import { createPost } from "../../apis/posts/postsApi";
import { useCreatePostMutation } from "../../apis/mutations/postMutations";
ReactModal.setAppElement("#root");

function AddPostModal({isOpen, onRequestClose , layoutRef}) {
    const [ visiviltyOption , setVisibilityOption ] = useState({label: "Public", value: "Public"});
    const [ textareaValue, setTextareaValue ] = useState("");
    const [ uploadImages, setUploadImages ] = useState([]);
    const {isLoading, data} = useMeQuery();
    const imageListBoxRef = useRef();
    const createPostMutation = useCreatePostMutation();

    const handleOnWheel = (e) => {
        imageListBoxRef.current.scrollLeft += e.deltaY;
    }

    const handleFileLoadOnClick = () => {
        const filInput = document.createElement("input");
        filInput.setAttribute("type", "file");
        filInput.setAttribute("accept", "image/*");
        filInput.setAttribute("multiple", "true");
        filInput.click();

        filInput.onchange = (e) => {
            const {files} = e.target;
            const fileArray = Array.from(files);

            const readFile = (file) =>new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (e) => {
                    resolve({
                        file,
                        dataUrl: e.target.result
                    });
                }
            });

        Promise
        .all(fileArray.map(file => readFile(file)))
        .then(result => {
            setUploadImages([...uploadImages, ...result]);

        });
    }
}   
    const handleImageDeleteOnClick = (index) => {
        const deletedImages = uploadImages.filter((img, imgIndex) => imgIndex !== index);
        setUploadImages(deletedImages);
    }

    const handlePostSubmitOnClick = async () => {
        const formData = new FormData();
        formData.append("content", textareaValue);
        formData.append("visibility", visiviltyOption.value);
        for (let img of uploadImages) {
            formData.append("files", img.file);
        }
        try {
            await createPostMutation.mutateAsync(formData);
            alert("작성완료");
            onRequestClose();
        } catch (error) {
            alert(error.response.data.message);

        }

    }
    if (isLoading) {
        return <Loading />
    }

    if (createPostMutation.isPending) {
        return <Loading />
    }
   
    return <ReactModal 
        style={{
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#00000000",
            },
            content: {
                position: 'static',
                boxShadow:"0 0 10px #00000033",
                padding: "0",
            }

        }}
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        parentSelector={() => layoutRef.current}
        appElement={layoutRef.current}
        ariaHideApp={false}>
            {
                createPostMutation.isPending && <Loading /> 
            }
            <div css={s.modalLayout}>
                <header>
                    <h2>Add a Post</h2>
                </header>
                <main>
                    <div css={s.profileContainer}>                   
                        <div css={s.profileImg(data.data.imgUrl)}></div>                        
                        <div>{data.data.nickname}</div>
                    </div>
                    <Select 
                                options={[
                                    {
                                        label: "Public",
                                        value: "Public"
                                    },
                                    {
                                        label: "Follow",
                                        value: "Follow"
                                    }
                                ]}
                                value={visiviltyOption}
                                onChange={(option) => setVisibilityOption(option)}
                                />
                    <div css={s.contentInputBox}>
                        <textarea value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}></textarea>
                    </div>
                    <div css={s.uploadBox} onClick={handleFileLoadOnClick}> 
                        <IoCloudUploadOutline />
                        <div>Please post your story.</div>
                        <button>Add Image</button>
                    </div>
                    <div css= {s.imageListBox} ref={imageListBoxRef} onWheel={handleOnWheel}>
                        {
                            uploadImages.map((img, index) => (
                                <div key={index} css={s.preview(img.dataUrl)}>
                                    <div onClick={() => handleImageDeleteOnClick(index)}><IoIosClose /></div>
                                </div>  
                            ))
                        }
                        
                    </div>
                </main>
                <footer>
                    <button css={s.postButton} onClick={handlePostSubmitOnClick}>Post</button>
                    <button onClick={onRequestClose}>Cancel</button>
                </footer>

            </div>

    </ReactModal>
}

export default AddPostModal;

