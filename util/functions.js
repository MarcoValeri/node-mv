/**
 * Create a function that gets
 * @param string
 * and
 * @return string date
 * with formt dd/mm/yyyy
 */
exports.contentDate = getContentDate => {
    const setDateObj = new Date(getContentDate);
    
    // Day
    let setTheDay = setDateObj.getDate();
    if (setTheDay < 10) setTheDay = `0${setTheDay}`;

    // Month
    let setTheMonth = setDateObj.getMonth() + 1;
    if (setTheMonth < 10) setTheMonth = `0${setTheMonth}`;

    // Year
    let setTheYear = setDateObj.getFullYear();

    // Output
    const output = `${setTheDay}/${setTheMonth}/${setTheYear}`;
    return output;
}

/**
 * Create a functions that
 * @return string current date
 * with format dd/mm/yyyy
 */
exports.setDateNow = () => {
    const setDateObj = new Date();

    // Day
    let setTheDay = setDateObj.getDate();
    if (setTheDay < 10) setTheDay = `0${setTheDay}`;

    // Month
    let setTheMonth = setDateObj.getMonth();
    if (setTheMonth < 10) setTheMonth = `0${setTheMonth}`;

    // Year
    let setTheYear = setDateObj.getFullYear();

    // Output
    const output = `${setTheDay}/${setTheMonth}/${setTheYear}`;
    return output;
}