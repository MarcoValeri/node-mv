document.addEventListener('DOMContentLoaded', () => {
    
    // DOM variables
    const genderLegend = document.getElementById('gender-legend');
    const genderMale = document.getElementById('gender-male');
    const genderFemale = document.getElementById('gender-female');
    const genderNonBinary = document.getElementById('gender-non-binary');
    const contentMainMale = document.getElementById('content-main-male');
    const contentMainFemale = document.getElementById('content-main-female');
    const contentMainNonBinary = document.getElementById('content-main-non-binary');

    if (genderMale && genderFemale && genderNonBinary) {

        genderMale.addEventListener('click', () => {
            genderFemale.classList.remove('single-article__gender-icon--active');
            genderNonBinary.classList.remove('single-article__gender-icon--active');
            genderMale.classList.add('single-article__gender-icon--active');
            contentMainFemale.style.display = 'none';
            contentMainNonBinary.style.display = 'none';
            contentMainMale.style.display = 'block';
            genderLegend.innerHTML = 'Sentiti libero...';
        })
    
        genderFemale.addEventListener('click', () => {
            genderMale.classList.remove('single-article__gender-icon--active');
            genderNonBinary.classList.remove('single-article__gender-icon--active');
            genderFemale.classList.add('single-article__gender-icon--active');
            contentMainMale.style.display = 'none';
            contentMainNonBinary.style.display = 'none';
            contentMainFemale.style.display = 'block';
            genderLegend.innerHTML = "Sentiti libera...";
        })
    
        genderNonBinary.addEventListener('click', () => {
            genderMale.classList.remove('single-article__gender-icon--active');
            genderFemale.classList.remove('single-article__gender-icon--active');
            genderNonBinary.classList.add('single-article__gender-icon--active');
            contentMainMale.style.display = 'none';
            contentMainFemale.style.display = 'none';
            contentMainNonBinary.style.display = 'block';
            genderLegend.innerHTML = "Sentiti liberə...";
        })
    }


})