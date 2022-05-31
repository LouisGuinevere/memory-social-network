import React, {useState} from 'react'
import useStyles from "./styles"

const ImageSlider = ({post}) => {
    const classes = useStyles();
    const [currentImage, setCurrentImage] = useState(0);
    const defaultPic = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
    const nextImage = () => {
        setCurrentImage((state) => state === post.selectedFile.length - 1 ? 0 : state+1);
    }
    const prevImage =() => {
        setCurrentImage((state) => state === 0 ? post.selectedFile.length - 1 : state-1);
    }
    return (
        <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile[currentImage] || defaultPic} alt={post.title} />
            {  
                post.selectedFile.length !== 1 && 
                <>
                    <div id="prev" href="" className={`${classes.prev} ${classes.btn}`} onClick={prevImage}>❮</div>
                    <div id="next" href="" className={`${classes.next} ${classes.btn}`} onClick={nextImage}>❯</div>
                </>
            }
        </div>
    )
}

export default ImageSlider