const maleMetabolicRate = 0.68
const femaleMetabolicRate = 0.55
const poundsToGrams = 454
const gramsAlcoholPerDrink = 14
const drinkingLimit = 0.08
const rateOfDecay = 0.015

// variables to store user input
const inputGender = document.querySelector("#gender")
const inputDrinks = document.querySelector("#drinks")
const inputTime = document.querySelector("#elapsed-time")
const inputWeight = document.querySelector("#weight")

// output selectors for printing calculation
const showBAC = document.querySelector("#show-bac")
const showRecommendation = document.querySelector("#recommendation")

function calculateBAC() {
    const gender = inputGender.value
    var drinks = Number(inputDrinks.value * gramsAlcoholPerDrink)
    const time = Number(inputTime.value)
    var weight = Number(inputWeight.value * poundsToGrams)
    console.log(gender, drinks, time, weight)
    // Modify weight based upon gender specific metabolic rate, for accurate calculation
    if (gender == "male") {
        weight = weight * maleMetabolicRate
    } else {
        weight = weight * femaleMetabolicRate
    }
    // Convert the number of drinks to the raw amount of alcohol consumed in grams
    // Calculate raw alcohol in blood, then convert to percentage
    var rawAlcohol = (drinks / weight) * 100
    // Compensate for drop in BAC over time based upon rateOfDecay
    rawAlcohol = rawAlcohol - (time * rateOfDecay)
    // Return the calculated BAC in element
    showBAC.innerHTML = rawAlcohol.toFixed(3)
    // Check to see if the calculated BAC is above or below legal limit, set recommendation
    if (rawAlcohol >= drinkingLimit) {
        showRecommendation.innerHTML = "not drive";
    } else if ((rawAlcohol < drinkingLimit) && (rawAlcohol > 0)){
        showRecommendation.innerHTML = "not drive, but you are legally allowed to."
    } else {
        showRecommendation.innerHTML = "drive whenever, because you haven't been drinking! Odd site to use, then."
    }
}

// listener calls, auto updates output as the user changes any of the inputs
inputGender.addEventListener("input", calculateBAC)
inputDrinks.addEventListener("input", calculateBAC)
inputTime.addEventListener("input", calculateBAC)
inputWeight.addEventListener("weight", calculateBAC)