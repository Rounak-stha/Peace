import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker from 'emoji-picker-react';

import './PeaceBox.css'

function PeaceBox({userName, avatarSrc, server}) {
    const [peaceText, setPeaceText] = useState('')
    const [showEmoKeyboard, setShowEmoKeyboard] = useState(false)
    
    let desktop = window.innerWidth > 800 ? " desktop-peacebox" : ""

    function onEmojiClick(e, {emoji}) {
        setPeaceText((prevState) => prevState + emoji)
    }

    function handleEmojiKeyboardShow(e) {
        e.stopPropagation()
        setShowEmoKeyboard((prevState) => !prevState)
    }

    /* document.addEventListener('click', () => setShowEmoKeyboard((prevState) => {  // is this okay?
        if (prevState) return (!prevState)
    })) */
    
    async function handlePeaceSubmit() {
        fetch(`${server}/post/userPost`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userName, post: peaceText})
        })
            .then((res) => {
                if (res.status === 500) return
                if (res.status === 200) setPeaceText('')
            })
            .catch(() => 1)  // To-Do
    }
    return (
        <div className={`peace-box${desktop}`}>
            <form>
                <div className="peace-input-div">
                    <Avatar className="peace-box-avatar" src={avatarSrc} />
                    <textarea 
                        className="peace-input" 
                        placeholder="Add Your Peace" 
                        type="text"
                        value={peaceText}
                        onChange={(e) => setPeaceText(e.target.value)}
                    />
                </div>
            </form>
            <div className="peacebox-footer">
                    <EmojiEmotionsIcon 
                        className="emoji-click"
                        onClick={(e) => handleEmojiKeyboardShow(e)}
                    />
                <Button 
                    className="peace-box-button"
                    onClick={handlePeaceSubmit}
                >Peace</Button>
            </div>
            {showEmoKeyboard ? <div className="adjust-emojiKeyboard"><Picker onEmojiClick={onEmojiClick} /></div> : null}
        </div>
    )
}

export default PeaceBox
