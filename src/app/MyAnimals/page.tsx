'use client'

import originalStyles from "@/app/page.module.css";
import React from "react";
import AnimalCard from "./AnimalCard";
import { animalEntry } from "../page";

export default function Page() {
    var [savedAnimals, setSavedAnimals] = React.useState([]);
    const [animalsUpdate, setAnimalsUpdate] = React.useState<boolean>(false);

    function handleRemove() {
	setAnimalsUpdate(!animalsUpdate);
	setSavedAnimals(localStorage.getItem("savedAnimals") ? JSON.parse(localStorage.getItem("savedAnimals") || '') : null);
    }

    React.useEffect(() => {
        setSavedAnimals(localStorage.getItem("savedAnimals") ? JSON.parse(localStorage.getItem("savedAnimals") || '') : null);
    }, []);

    return (
        <main className={originalStyles.main}>
            <div className="b_body">
                <div className="b-page_title">
                    My Animals
                </div>
                <div className="b-page_body">
                    <div className="b-page_body-details">
                        Hi, there! This is the MyAnimals page. Here you will be able to see the details of your saved animals.
                    </div>
                        You currently have {savedAnimals ? savedAnimals.length : 0} saved animals.
                    <div className="b-animal_cards">
                        {savedAnimals && savedAnimals.length > 0 ? savedAnimals.map((animal: animalEntry) => <AnimalCard animalsUpdate={(animalsUpdate)} handleRemove={handleRemove} key={animal.names} animal={animal}></AnimalCard>) : null}
                    </div>
                </div>
            </div>
        </main>
    )
  }