import React, { Component } from 'react'  
import DatePicker from "react-datepicker";  


export class Datepic extends Component {  

    render() {
        return (  
            <DatePicker className="form-control"
                {...this.props}
                selected={this.props.dateSelected}
                showPopperArrow={false}  
                onChange={this.props.onChange}
                showMonthDropdown
                showYearDropdown
            />  
        )  
    }  
}  
  
export default Datepic