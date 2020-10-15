import commonColor from '../../native-base-theme/variables/commonColor';
import {Platform} from 'react-native';

const platform = Platform.OS;

const customCommonColor = {
    ...commonColor,
    toolbarDefaultBg: '#FF0000',
    brandPrimary: platform === 'ios' ? '#FF0000' : '#FF0000',
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
}

export default customCommonColor;