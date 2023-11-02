const CustomDate = ({className}) => {

  const today = new Date();
  
  const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}`;
  
      return (
          <span className={className}>
             {formattedDate}
          </span>
      );
  }
  
  export default CustomDate;