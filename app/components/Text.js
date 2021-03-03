
import React, {Component} from 'react';
import {Text} from 'react-native';

export class GlobalText extends Component {
    render () {
        return (
            <Text
                {...this.props}
                style={[{
                    color:"black"}, this.props.style]}
            >
                {this.props.children}
            </Text>
        )
    }
}