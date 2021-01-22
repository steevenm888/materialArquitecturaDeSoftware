import React, { Component } from 'react'  
import DatePicker from "react-datepicker";  

export class TimePicker extends Component {  
        constructor(props) {  
                super(props)  
  
                this.state = {  
                        date: ''  
                }  
        }  
        Changedate = (e) => {  
                this.setState({  
                        date: e  
                });  
        };  
        render() {  
  
                return (  
                    <DatePicker className="form-control"  
                        showTimeSelect  
                        showTimeSelectOnly  
                        timeCaption="Time"  
                        dateFormat="h:mm aa"  
                        selected={this.state.date}
                        showPopperArrow={false}  
                        onChange={this.Changedate}  
                    />  
                )  
        }  
}  
  
export default TimePicker  