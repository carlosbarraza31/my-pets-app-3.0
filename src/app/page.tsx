'use client';

import Image from "next/image";
import styles from "./page.module.scss";
import originalStyles from "./page.module.css";
import React from "react";
import AnimalModal from "./AnimalModal";
import { persistAnimal } from "../../app/lib/data";
export interface animalEntry {
  names: string,
  lastName: string,
  birthDate: string,
  species: string,
  profilePicture?: string | null,
  [key: string]: string | null | undefined
}

export default function Home() {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalAppearing, setModalAppearing] = React.useState(false);

  async function persistAnimal(formData: animalEntry) {
    var newEntry = {
      names: formData['names'],
      lastName: formData['lastName'],
      birthDate: formData['birthDate'],
      species: formData['species'],
      profilePicture: formData['profilePicture'] ? URL.createObjectURL(formData['profilePicture'] as unknown as File) as string : null
    }
    const newAnimal = await persistAnimal(newEntry);
    console.log(newAnimal);
  }

  function handleAddAnimal() {
    setOpenModal(true);

    setTimeout(() => {
      setModalAppearing(true);
    }, 100);
  }

  return (
    <main className={originalStyles.main}>
      <div className={styles.home_body}>
        <Image src="/assets/mypets_icon.svg" width={96} height={96} alt="My Pets icon"></Image>
        <div className={styles.home_body_title}>
          Welcome to MyPets.
        </div>
        <div className={styles.home_body_description}>
          MyPets is the ultimate platform for managing data from the animals you care about. From dogs and cats, to even the most unique reptiles, birds or amphibians.
        </div>
        <button className={`${styles.home_body_petButton} ${styles.m_clickable_btn}`} onClick={handleAddAnimal}>
          <div className={styles.home_body_petButton_text}>
            Add your first animal
          </div>
          <Image className={styles.home_body_petButton_icon} src="/assets/arrow_circle_right.svg" width={20} height={20} alt="next arrow"></Image>
        </button>
        <AnimalModal openModal={openModal} setOpenModal={setOpenModal} modalAppearing={modalAppearing} setModalAppearing={setModalAppearing} persistAnimal={persistAnimal}>
        </AnimalModal>
      </div>
    </main>
  );
}
