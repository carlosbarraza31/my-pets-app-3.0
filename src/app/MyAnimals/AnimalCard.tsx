import React from "react";
import Image from "next/image";

interface Animal {
    names: string,
    lastName: string,
    birthDate: string,
    species: string,
    profilePicture?: string | null
}

interface AnimalCardProps {
    animal: Animal,
    animalsUpdate: boolean,
    handleRemove(): void
}

export default function AnimalCard(props: AnimalCardProps) {
    var animal = props.animal;
    var handleRemove = props.handleRemove;
    var noIconPicture = "/assets/animal_noicon.svg";
    var hasPicture = Object.keys(animal.profilePicture as Object).length > 0;

    const [showTooltip, setShowTooltip] = React.useState(false);

    function handleShowTooltip() {
        setShowTooltip(!showTooltip);
    }

    function handleRemoveAnimal() {
        var allAnimals = JSON.parse(localStorage.getItem("savedAnimals") || '');
        var animalsToKeep = allAnimals.filter((loopedAnimal : Animal) => loopedAnimal.names !== animal.names);
        localStorage.setItem("savedAnimals", JSON.stringify(animalsToKeep));
        handleRemove();

        console.log('remaining animals: ' + JSON.stringify(animalsToKeep));
    }

    return (
        <div className="b-card_wrapper">
            <div className={`b-card_tooltip ${showTooltip ? '' : 'h-hidden'}`}>
                <div className="b-card_tooltip-element">See details</div>
                <div className="b-card_tooltip-element" onClick={handleRemoveAnimal}>Remove</div>
            </div>
            <div className="b-card">
                <div className="b-card_icon-container">
                    <Image className="b-card_icon" src="/assets/more_icon.svg" alt="More Icon" width={20} height={20} onClick={handleShowTooltip}></Image>
                </div>
                <div className="b-card_name">
                    {animal.names}
                </div>
                <div className="b-card_lastname">
                    {animal.lastName}
                </div>
                <div className="b-card_image-container">
                    <Image className={`b-card_image ${!hasPicture && 'm-no_picture'}`} src={hasPicture ? animal.profilePicture as string : noIconPicture} fill={true} alt="Animal Picture"></Image>
                </div>
                <div className="b-card_data">
                    <span className="b-card_label">Date of birth: </span>
                    {animal.birthDate}
                </div>
                <div className="b-card_data">
                    <span className="b-card_label">Species: </span>
                    {animal.species}
                </div>
                <button className="b-card_details-btn">SEE DETAILS</button>
            </div>
        </div>
    )
}