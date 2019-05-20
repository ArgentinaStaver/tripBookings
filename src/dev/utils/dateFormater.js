export const getFullDateFormat = dateString => {
    const date = new Date(dateString);
    //let monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthsRo = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
    let days = ['Luni', "Marti", "Miercuri", "Joi", "Vineri", "Sambata", "Duminica"];

    return `${days[date.getDay()]} ${date.getDate()} ${monthsRo[date.getMonth()]} ${date.getFullYear()}`;
};

export default getFullDateFormat;