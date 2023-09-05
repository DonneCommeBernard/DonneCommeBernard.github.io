document.addEventListener("DOMContentLoaded", function () {
    const yourNetWorthContainer = document.getElementById("yourNetWorthContainer");
    const yourNetWorth = document.getElementById("yourNetWorth");
    const donationAmount = document.getElementById("donationAmount");
    const cursor = document.querySelector(".cursor");

    let firstEdit = true; // Flag to track the first edit

    const valueToItemMapping = {
        0: "aux impôts payés par Starbucks en France",
        0.04: "à une impression A4 en couleur",
        0.15: "d'une chocolatine (selon Jean-François Copé)",
        0.2: "à une bouteille d'eau minérale",
        0.49: "à 1cm² d'appartement à Lyon",
        0.6: "à un gros croc dans un Big Mac",
        0.76: "au prix de l'électricité pour 365 charges de smartphone",
        0.9: "à une cannette de Kronenbourg",
        1: "à 1 litre d'essence en 2002",
        1.2: "à 1km en taxi",
        1.4: "d'une chocolatine (pas selon Jean-François Copé)",
        2: "à 10km parcourus en TGV",
        2.1: "à un ticket de métro parisien",
        2.48: "à un café en terrasse à Paris",
        4: "à un paquet de 10 cartes Pokémon",
        5.5: "à un kebab",
        5.99: "à un mois d'abonnement (avec des pubs 😤) à Netflix",
        6.2: "au prix de construction d'1 cm d'autoroute",
        6.9: "à 1 minute d'un consultant McKinsey",
        7.7: "à un ticket resto",
        9.12: "à une heure de SMIC net",
        10.4: "à 1h de salaire net d'un enseignant débutant",
        12: "à une place de cinéma",
        16.66: "à 3 secondes de déplacement de Macron en avion",
        23: "à un exemplaire papier du Temps des Tempêtes",
        29.95: "au prix d'un titre de noblesse de Sealand",
        36: "à une dédicace vidéo de 15 secondes par Tibo Inshape",
        69.9: "à trois boules de pétanque sur la boutique de l'Elysée",
        80: "à beaucoup de trucs. J'espère que tu paies bien tes impôts toi"
    };

    yourNetWorthContainer.addEventListener("click", function () {
        if (firstEdit) {
            yourNetWorth.textContent = yourNetWorth.textContent.replace(/ /g, '');
            cursor.style.display = "none";
            firstEdit = false;
            // Create a range to place the cursor at the end
            const range = document.createRange();
            range.selectNodeContents(yourNetWorth);
            // range.collapse(false);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    yourNetWorthContainer.addEventListener("input", function () {
        let inputText = yourNetWorth.textContent;

        // Remove any non-numeric characters and leading zeros
        inputText = inputText.replace(/[^0-9]/g, '');
        inputText = inputText.replace(/^0+/, '');
        
        if (inputText === '') {
            inputText = '0'; // Ensure there's always a number, even if it's zero
            yourNetWorth.textContent = inputText;
            const range = document.createRange();
            range.selectNodeContents(yourNetWorth);
            range.collapse(false);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (inputText.length === 1) {
            yourNetWorth.textContent = inputText;
            const range = document.createRange();
            range.selectNodeContents(yourNetWorth);
            range.collapse(false);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            yourNetWorth.textContent = inputText;
        }        

        const yourNetWorthValue = parseFloat(inputText);

        if (!isNaN(yourNetWorthValue)) {
            const equivalentDonation = (yourNetWorthValue / 21400).toFixed(2);
            donationAmount.textContent = equivalentDonation + "€";

            // Update the "equivalent" span based on the closest value
            let closestValue = Object.keys(valueToItemMapping)[0];
            let minDifference = Math.abs(equivalentDonation - closestValue);

            for (const value in valueToItemMapping) {
                const difference = Math.abs(equivalentDonation - value);
                if (difference < minDifference) {
                    minDifference = difference;
                    closestValue = value;
                }
            }

            equivalent.textContent = valueToItemMapping[closestValue];
        } else {
            donationAmount.textContent = "Invalid input";
        }

        
    });
});
