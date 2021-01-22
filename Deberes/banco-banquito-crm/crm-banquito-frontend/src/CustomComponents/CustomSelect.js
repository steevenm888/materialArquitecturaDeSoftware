import style from '@ashvin27/react-datatable/lib/style';
import React from 'react';
import Select from 'react-select';
import CustomAlert from './CustomAlert';

class CustomSelect extends React.Component {

    selectStyle = {
        control: (base) => ({
            ...base,
            width: '1080%'
        }),
        menu: (base) => ({
            ...base,
            width: '1080%'
        })
    }

    render() {
        return (
            <div>
                <Select {...this.props} options={this.props.selectOptions} isSearchable />
            </div>
        )
    }
}

export default CustomSelect;