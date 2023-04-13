const functions = {
    formatDateToString: function (date) {
      const dateFormated = new Date(date);
  
      return dateFormated.toISOString();
    },
    formatDateToViewBar: function (date) {
      const data = new Date(date);
      const timeDiff = data.getTimezoneOffset() * 60000;
      const dataAjustada = new Date(data.valueOf() + timeDiff);
      const year = dataAjustada.getFullYear();
      const month = (dataAjustada.getMonth() + 1).toString().padStart(2, '0');
      const day = (dataAjustada.getDate().toString().padStart(2, '0'));
      const formattedDateString = `${year}-${month}-${day}`;
      return formattedDateString;
    },
    formatDateToView: function (date) {
      const dateFormated = new Date(date);
  
      const timeDiff = dateFormated.getTimezoneOffset() * 60000;
  
      const adjustedDate = new Date(dateFormated.valueOf() + timeDiff);
  
      return adjustedDate.toLocaleDateString().substring(0, 10);
    },
    formatDateHourToView: function (date) {
      const dateFormated = new Date(date);
  
      const timeDiff = dateFormated.getTimezoneOffset() * 60000;
  
      const adjustedDate = new Date(dateFormated.valueOf() + timeDiff);
  
      return adjustedDate.toLocaleString().substring(0, 17);
    },
    formatHourToView: function (date) {
      const dateFormated = new Date(date);
  
      const timeDiff = dateFormated.getTimezoneOffset() * 60000;
  
      const adjustedDate = new Date(dateFormated.valueOf() + timeDiff);
  
      return adjustedDate.toLocaleTimeString().substring(0, 2);
    },
    formatDateToUpdateLicense: function (date) {
      const dateFormated = new Date(date);
  
      let timeDiff = dateFormated.setDate(dateFormated.getDate() + 14);
  
      timeDiff = new Date(timeDiff).toISOString();
  
      return timeDiff;
    },
  };
  
  export default functions;
  