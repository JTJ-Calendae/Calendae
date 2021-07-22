module.exports = {
  format_time: (time) => {
    let hours = time.substring(0, 2);
    hours = (hours % 12) || 12;
    let minutes = time.substring(3, 5);
    let amOrPm = hours >= 12 ? 'AM' : 'PM'
    return `${hours}:${minutes} ${amOrPm}`;
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};