import customCommonColor from "./customCommonColor";
import getTheme from '../../native-base-theme/components';
import textTheme from '../../native-base-theme/components/Text';
import contentTheme from '../../native-base-theme/components/Content';
import buttonTheme from '../../native-base-theme/components/Button';
import B from '../../native-base-theme/components/CheckBox'
import inputTheme from '../../native-base-theme/components/Input';
import itemTheme from '../../native-base-theme/components/Item';
import viewTheme from '../../native-base-theme/components/View';
import formTheme from '../../native-base-theme/components/Form';
import iconTheme from '../../native-base-theme/components/Icon';
import segmentTheme from '../../native-base-theme/components/Segment';
import listItemTheme from '../../native-base-theme/components/ListItem';
import checkBoxTheme from '../../native-base-theme/components/CheckBox';
import merge from 'lodash/merge';


const theme = () => {
    const primaryColor = '#ffdf00';
    const black = '#000000';
    const white = '#ffffff';


    const nbTheme = getTheme(customCommonColor);
    let overrides;
    overrides = {
        "NativeBase.Text": {
            ...textTheme(),
            ".link": {
                color: '#000000'
            },
            color: 'red',
            ".large": {
                color: primaryColor,
                fontSize: 35,
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 10,
                fontFamily: ''
            },
            ".medium": {
                fontFamily: 'NexaRegular',
                marginTop: 15,
                marginBottom: 15,
                textAlign: 'justify',
            },
            ".mediumBold": {
                fontFamily: 'NexaRegular',
                marginTop: 15,
                marginBottom: 15,
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'justify'
            },
            ".large-dark":{
                fontFamily: '',
                color: black,
                fontSize: 35,
                fontWeight: "600",
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 10
            },
            ".medium-dark":{
                color: black,
                fontSize: 12,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 10,
                fontFamily: '',
            },
            ".small-dark":{
                color: black,
                fontSize: 9,
                textTransform: 'uppercase',
                marginTop: 10,
                marginBottom: 10,
                fontFamily: '',
            }
        },
        'NativeBase.Button': {
            ...buttonTheme(),
            borderRadius: 0,
            backgroundColor: primaryColor,
            marginTop: 10,
            marginBottom: 10,
            'NativeBase.Text': {
                fontFamily: '',
                color: black,
                fontSize: 20,
                fontWeight: 'bold',
            },
            '.transparent': {
                'NativeBase.Text': {
                    fontFamily: '',
                    color: white,
                    fontSize: 15,
                    fontWeight: 'bold',
                },
            },
            '.border': {
                backgroundColor: 'transparent',
                borderColor: primaryColor,
                borderWidth: 3,
                'NativeBase.Text': {
                    fontFamily: '',
                    color: primaryColor,
                    fontSize: 15,
                    fontWeight: 'bold',
                },
            }
        },
        "NativeBase.Item": {
            ...buttonTheme(),
            ".regular": {
                "NativeBase.Input": {
                    color: 'white',
                },
                fontFamily: '',
                borderWidth: 2,
                borderColor: white,
                color: 'white',
                backgroundColor: 'transparent',
                marginTop: 7,
                marginBottom: 7,
            },

            ".regularWhite": {
                "NativeBase.Input": {
                    fontFamily: '',
                    color: black,
                    backgroundColor: white,
                    borderRadius: 3,
                },
                marginTop: 1,
                marginBottom: 1
            },
            ".simple": {
                "NativeBase.Input": {
                    fontFamily: '',
                    color: black,
                    backgroundColor: primaryColor,
                    borderRadius: 3,
                    borderColor:black,
                    borderWidth: 2,
                },
                marginRight: 10,
                marginTop: 7,
                marginBottom: 7,

            },
        },
        "NativeBase.Form": {
            ...formTheme(),
            marginLeft: 15,
            marginRight: 15,
            '.yellow': {
                backgroundColor: primaryColor,
                marginRight: 15,
            }
        },
        "NativeBase.Icon": {
            ...iconTheme(),
            //tintColor: primaryColor,
            ".close":{
                fontSize:25
            }
        },
        "NativeBase.Segment": {
            ...segmentTheme(),
            backgroundColor: 'transparent',
            'NativeBase.Button': {
                //...buttonTheme(),
                borderRadius:4,
                margin:10,
                borderColor: 'tranparent',
                'NativeBase.Text': {
                  color: primaryColor
                },
                '.active':{
                    backgroundColor: primaryColor,
                    'NativeBase.Text': {
                        color: black
                    },
                }
            }
        }
    };
    return merge(nbTheme, overrides);
}

export default theme;