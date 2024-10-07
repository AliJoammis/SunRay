
// Convert "YYYY-MM-ddT21:00:00.000Z" to "yyyy-MM-dd" format
export const convertDateFormat = (dateStringFormat: string) =>{

    if (!dateStringFormat){
        return dateStringFormat;
    }
    const dateObject = new Date(dateStringFormat);

    // Get year, month, and day
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Format date as yyyy-MM-dd
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };