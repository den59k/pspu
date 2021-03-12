import { useEffect, useState } from 'react'

import styles from './bottom-info.module.sass'

import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'


export default function Gallery ({images}){
	
	const [ currentSlide, setCurrentSlide ] = useState(0)
	
	useEffect(() => {
		setCurrentSlide(0)
	}, [images])
	
	if(!images || images.length === 0) return null
	
	const slide = (inc) => {
		let newSlide = currentSlide + inc
		if(newSlide < 0) newSlide = 0
		if(newSlide > images.length-1) newSlide = images.length-1
		setCurrentSlide(newSlide)
	}

	return (
		<div className={styles.gallery}>
			
			<div className={styles.slider} style={{transform: `translateX(${currentSlide * -100}vw)`}}>
				{images.map((image, index) => (
					<div key={index} style={{backgroundImage: `url(${image.src.replaceAll('\\', '/')})`}}></div>
				))}
			</div>
			{ currentSlide > 0 && <button className={styles.left} onClick={() => slide(-1)}><RiArrowLeftSLine/></button> }
			{ currentSlide < images.length-1 && <button className={styles.right} onClick={() => slide(1)}><RiArrowRightSLine/></button> }
		</div>
	)
}