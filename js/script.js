const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const physicalActivities = document.querySelector('.radios-group');
const counterResult = document.querySelector('.counter__result');
const formSubmitButton = document.querySelector('.form__submit-button');
const formResetButton = document.querySelector('.form__reset-button');
const caloriesNorm = counterResult.querySelector('#calories-norm');
const caloriesMinimal = counterResult.querySelector('#calories-minimal');
const caloriesMaximal = counterResult.querySelector('#calories-maximal');

const weightFormula = (weight, height, age) => 10 * weight + 6.25 * height - 5 * age;
let activityCoefficient = 1.2;
const coefficientWeightLoss = 0.85;
const coefficientWeightGain = 1.15;

physicalActivities.addEventListener('change', (evt) => {
    switch (evt.target.value) {
        case 'min':
            activityCoefficient = 1.2;
            break;
        case 'low':
            activityCoefficient = 1.375;
            break;
        case 'medium':
            activityCoefficient = 1.55;
            break;
        case 'high':
            activityCoefficient = 1.725;
            break;
        case 'max':
            activityCoefficient = 1.9;
            break;
    }
});

const checkButtonState = () => {
    formSubmitButton.disabled = !(age.value > 0 && height.value > 0 && weight.value > 0);
    formResetButton.disabled = !(age.value > 0 || height.value > 0 || weight.value > 0);
}

formSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const formulaConstant = genderMale.checked ? 5 : -161;
    const result = (weightFormula(weight.value, height.value, age.value) + formulaConstant) * activityCoefficient;

    caloriesNorm.textContent = Math.round(result).toString();
    caloriesMinimal.textContent = Math.round(result * coefficientWeightLoss).toString();
    caloriesMaximal.textContent = Math.round(result * coefficientWeightGain).toString()

    counterResult.classList.remove('counter__result--hidden');
});

formResetButton.addEventListener('click', () => {
    genderMale.checked = true;
    genderFemale.checked = false;

    age.value = '';
    height.value = '';
    weight.value = '';

    physicalActivities.querySelector('#activity-minimal').checked = true;
    physicalActivities.querySelector('#activity-low').checked = false;
    physicalActivities.querySelector('#activity-medium').checked = false;
    physicalActivities.querySelector('#activity-high').checked = false;
    physicalActivities.querySelector('#activity-maximal').checked = false;
    activityCoefficient = 1.2;

    checkButtonState();
    counterResult.classList.add('counter__result--hidden');
});


const checkGroupButton = () => {
    document.querySelector('.inputs-group').addEventListener('input', checkButtonState);
}

checkGroupButton();
