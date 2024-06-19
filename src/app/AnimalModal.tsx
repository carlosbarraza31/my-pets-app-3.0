import Image from "next/image";
import React, { Dispatch, SetStateAction, FormEvent } from "react";
import styles from "./page.module.scss";
import { animalEntry } from "./page";

interface ModalProps {
    openModal: boolean,
    modalAppearing: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    setModalAppearing: Dispatch<SetStateAction<boolean>>,
    persistAnimal(formData: animalEntry): void
}

export default function AnimalModal(props : ModalProps) {
    const openModal = props.openModal;
    const persistAnimal = props.persistAnimal;
    const modalAppearing = props.modalAppearing;
    const setModalAppearing = props.setModalAppearing;
    const modalRef= React.useRef<HTMLDialogElement>(null);

    const [dateSelected, setDateSelected] = React.useState(false);
    const [mixedBreed, setMixedBreed] = React.useState(false);
    const [modalDisappearing, setModalDisappearing] = React.useState(false);

    React.useEffect(() => {
        openModal ? modalRef.current?.showModal() : modalRef.current?.close();
    });

    function handleMixedBreedSelect() {
        setMixedBreed(!mixedBreed);
    }

    function handleModalClose() {
        setModalAppearing(false);
        setModalDisappearing(true);

        setTimeout(() => {
            setModalDisappearing(false);
            props.setOpenModal(false);
        }, 200);
    }

    function onSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleModalClose();

        var formData = Object.fromEntries(new FormData(event.currentTarget));
        var formDataFormatted : animalEntry = {
            names: '',
            lastName: '',
            birthDate: '',
            species: ''
        };

        Object.keys(formData).forEach((key) => {
            formDataFormatted[key] = formData[key] as string;
        })
        persistAnimal(formDataFormatted);
    }

    return (
        <dialog className={`${styles.home_body_modal} ${modalDisappearing && styles.m_disappear} ${modalAppearing && styles.m_appear}`} ref={modalRef}>
          <div className={styles.home_body_modal_close} onClick={handleModalClose}>
            <Image className={styles.m_clickable_icon} src="/assets/close_icon.svg" width={20} height={20} alt="Close Modal"></Image>
          </div>
          <div className={styles.home_body_modal_title}>
            Add new animal client
          </div>
          <div className={styles.home_body_modal_content}>
            <div className={styles.home_body_modal_description}>
                Please fill out the following data for the new animal. Fields marked with a * are required.
            </div>
            <form className={styles.home_body_modal_form} onSubmit={onSubmit}>
                <div className={styles.home_body_modal_input_group}>
                    <input className={styles.home_body_modal_input} autoFocus required type="text" id="names" name="names" placeholder="Name(s) *"></input>
                    <input className={styles.home_body_modal_input} required type="text" id="lname" name="lastName" placeholder="Last Name *"></input>
                </div>
                <div className={styles.home_body_modal_input_group}>
                    <label className={styles.home_body_modal_input_label} htmlFor="bdate">Date of birth</label>
                    <input className={`${styles.home_body_modal_input_date} ${dateSelected && 'm-selected'}`} required type="date" id="bdate" name="birthDate" placeholder="Date of birth *" onChange={() => setDateSelected(true)}></input>
                </div>
                <div className={styles.home_body_modal_input_group}>
                    <label className={`${styles.home_body_modal_input_label} ${mixedBreed && 'm-disabled'}`} htmlFor="species">Species</label>
                    <select disabled={mixedBreed ? true : false} className={`${styles.home_body_modal_input} ${mixedBreed ? '' : styles.m_pointer}`} required id="species" name="species">
                        <option value="Chrome">Chrome</option>
                        <option value="Firefox">Firefox</option>
                        <option value="Internet Explorer">Internet Explorer</option>
                    </select>

                    <label className={styles.home_body_modal_input_label} htmlFor="mBreed">Is Mixed Breed?</label>
                    <input className={mixedBreed ? styles.home_body_modal_checked_checkbox : styles.home_body_modal_unchecked_checkbox} type="checkbox" id="mBreed" name="mixedBreed" value="true" onChange={handleMixedBreedSelect}></input>
                </div>
                <div className={styles.home_body_modal_input_group}>
                    <label className={styles.home_body_modal_input_label} htmlFor="ppicture">Upload a picture of the animal</label>
                    <input className={styles.home_body_modal_input_file} type="file" id="ppicture" name="profilePicture" accept="image/png, image/jpeg, image/heic"></input>
                </div>
                <button className={`m_icon_animate ${styles.home_body_modal_submit} ${styles.m_clickable_btn}`} type="submit">
                    <Image className={`b_icon ${styles.home_body_modal_submit_icon}`} src="/assets/add_icon.svg" width={20} height={20} alt="Add Animal"></Image>
                    Add new animal
                </button>
            </form>
          </div>
        </dialog>
    )
}