import { css } from "@emotion/react";

export const modalLayout = css`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 500px;

    & > header {
        box-sizing: border-box;
        padding: 10px 20px;
        height: 50px;

        & > h2 {
            margin: 0;
            cursor: default;
        }
    }
    & > main {
        box-sizing: border-box;
        padding: 10px 20px;
        flex-grow: 1;
    }
    & > footer {
        display: flex;
        justify-content: flex-end;  
        box-sizing: border-box;
        padding: 10px;
        height: 50px;

        & > button {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border: none;
            background-color: transparent;
            cursor: pointer;
            font-size: 16px;
        }
    }
 `;

 export const postButton = css`
    text-shadow: 0 0 10px #000000aa;
 `;
 export const profileContainer = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 10px;
    cursor: default;
    
    `;
 export const profileImg = (url) => css`
    margin-right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-image: url(${url});
    background-size: cover;
    background-position: center;
`;

export const contentInputBox = css`

    & > textarea {
        box-sizing: border-box;
        outline: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        padding: 5px 10px;
        width: 100%;
        height: 80px;
        resize: none;
        font-size: 15px;
        color: #222222;
        cursor: pointer;
        

    }

`;
export const uploadBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    border: 1px dashed #cccccc;
    border-radius: 4px;
    padding: 10px;
    color: #222;
    cursor: pointer;
        & > button {
            margin-top: 10px;
            border: none;
            border-radius: 10px;
            padding: 5px 10px;
            cursor: pointer;
        }

`;

export const imageListBox = css`
    display: flex;
    gap: 5px;
    margin-top: 10px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 90px;
    background-color: #fafafa;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        /* display: none; */
    }
`;

export const preview = (url) => css`
    flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    width: 70px;
    height: 70px;
    background-image: url(${url});
    background-position: center;
    background-size: cover;
    &:not(:hover) > div {
        opacity: 0;

    }

    & > div {
        position: absolute;
        top: 2px;
        right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid #ffffff;
        border-radius: 8px;
        width: 40px;
        height: 40px;
        font-size: 20px;
        color: #ffffff;
        background-color: #00000066;
        cursor: pointer;
    }
`;