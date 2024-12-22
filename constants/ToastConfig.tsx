import { BaseToast, ErrorToast } from 'react-native-toast-message';

const ToastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', width: '90%' }}
      text1Style={{
        fontSize: 17,
        fontFamily: 'Bold'
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: 'Medium'
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red', width: '90%' }}
      text1Style={{
        fontSize: 17,
        fontFamily: 'Bold'
      }}
      text2Style={{
        fontSize: 16,
        fontFamily: 'Medium'
      }}
    />
  ),
}

export default ToastConfig