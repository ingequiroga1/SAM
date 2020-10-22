export interface ToolbarData {
    isShowRightToolbar?,
    rightToolbarLinks?
    parent:{
        name: string,
        url: string
    },
    children:{
        name: string,
        url: string
    }[]
};