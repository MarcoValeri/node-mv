exports.test = () => {
    return `Hello Node`;
}

/**
 * Create a functions that gets
 * @param string
 * and
 * @return string date
 * with formt dd/mm/yyyy
 */
exports.contentDate = getContentDate => {
    const setDateObj = new Date();
    
    // Day
    let setTheDay = setDateObj.getDate(getContentDate);
    if (setTheDay < 10) setTheDay = `0${setTheDay}`;

    // Month
    let setTheMonth = setDateObj.getMonth(getContentDate);
    if (setTheMonth < 10) setTheMonth = `0${setTheMonth}`;

    // Year
    let setTheYear = setDateObj.getFullYear(getContentDate);

    // Output
    const output = `${setTheDay}/${setTheMonth}/${setTheYear}`;
    return output;
}