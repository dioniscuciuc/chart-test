import React from 'react';


export default class SearchBar extends React.Component {

    submitInputData = (e) => {
        if(e.key === 'Enter'){
            this.props.companyUpdate(e.target.value);
        }
    };

    render (){
        return (
            <div>
                <input type="text" onKeyPress={this.submitInputData}/>
                set company code and hit enter
            </div>
        )
    }
}