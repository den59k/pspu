import cn from 'classnames'

import styles from './tab-bar.module.sass'

export default function TabBar ({tabs, onChange, value}){

	return (
		<div className={styles.container}>
			{tabs.map((item, index) => (
				<button onClick={() => onChange(index)} className={cn(value === index && styles.active)} key={index}>
					{item
				}</button>
			))}
		</div>
	)
}