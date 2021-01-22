import React from 'react'  
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  
class Datefce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    render() {
        return (   
            <DatePicker  showPopperArrow={false} selected={this.state.date} onChange={date => this.setState({date: date})} />   
        ) 
    }
}

// function Datefce() {  
//         const [data, setData] = useState(new Date());  
//         return (   
//             <DatePicker  showPopperArrow={false}  placeholderText="Select Date" selected={data} onChange={date => setData(date)} />   
//         )  
// }  
  
export default Datefce