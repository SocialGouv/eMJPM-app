const DislayDate = date => {
  let months = "";
  switch (date.date.slice(5, 7)) {
    case "01":
        return  date.date.slice(8, 10) + " janvier " + date.date.slice(0, 4);
      break;
    case "02":
        return  date.date.slice(8, 10) + " février " + date.date.slice(0, 4);
      break;
    case "03":
        return  date.date.slice(8, 10) + " mars " + date.date.slice(0, 4);
      break;
    case "04":
        return  date.date.slice(8, 10) + " avril " + date.date.slice(0, 4);
      break;
    case "05":
        return  date.date.slice(8, 10) + " mai " + date.date.slice(0, 4);
      break;
    case "06":
        return  date.date.slice(8, 10) + " juin " + date.date.slice(0, 4);
      break;
    case "07":
        return  date.date.slice(8, 10) + " juillet " + date.date.slice(0, 4);
      break;
    case "08":
        return  date.date.slice(8, 10) + " août " + date.date.slice(0, 4);
      break;
    case "09":
        return  date.date.slice(8, 10) + " septembre " + date.date.slice(0, 4);
      break;
    case "10":
        return  date.date.slice(8, 10) + " octobre " + date.date.slice(0, 4);
      break;
    case "11":
        return  date.date.slice(8, 10) + " novembre " + date.date.slice(0, 4);
      break;
    case "12":
        return  date.date.slice(8, 10) + " décembre " + date.date.slice(0, 4);
  }
};

export default DislayDate;