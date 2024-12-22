declare module 'react-native-animated-splash-screen' {
    import React from 'react'

    interface Props {
        preload?: boolean
        logoWidth?: number
        logoHeight?: number
        backgroundColor?: string
        isLoaded: boolean
        disableBackgroundImage?: boolean
        logoImage?: string | number | object
        translucent?: boolean
        customComponent?: React.ReactNode
        disableAppScale?: boolean
        duration?: number
        delay?: number
        showStatusBar?: boolean

        children?: React.ReactNode
    }

    const props: React.FC<Props>
    export default props
}