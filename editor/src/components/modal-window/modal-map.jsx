import styles from './styles.module.sass' 
import { useModal } from "components/modal-window"
import ModalBase from "components/modal-window/modal-base"

import { useForm } from "components/controls"
import Input from "components/controls/input"
import Gallery from "components/controls/gallery"
import { Label } from 'components/controls/label'

export const ModalMap = ({info, onSubmit}) => {

	const { close } = useModal()
	const form = useForm(info)

	const _onSubmit = () => {
		onSubmit(form.values.toObject())
		close()
	}
	
	return (
		<ModalBase title="Изменение аудитории">
			<div className="form" style={{width: "auto"}}>
				<Input label="Номер" placeholder="Номер аудитории" form={form} name="number"/>
				<Input label="Название" placeholder="Доп. название аудитории" form={form} name="name"/>
				<Gallery label="Фото аудитории" form={form} name="images"/>

				<Label label="Прочая информация"></Label>
				<Input label="Количество мест" placeholder="Мест в аудитории" form={form} name="places"/>
				<Input label="Оборудование" placeholder="ПК, проектор..." form={form} name="devices"/>
				
				<div className={styles.buttons}>
					<button className="button" onClick={close}>Отмена</button>
					<button className="button-filled" onClick={_onSubmit}>
						Сохранить
					</button>
				</div>
			</div>
		</ModalBase>
	)
}

export function useModalMap (){
	const { open } = useModal()

	return (info, onSubmit) => open( <ModalMap info={info} onSubmit={onSubmit}/> )
}

