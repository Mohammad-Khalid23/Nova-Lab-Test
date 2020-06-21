export const goBack = (navigation) => {
    navigation.goBack();
};

export const routeTo = (navigation, routeName, params) => {
    navigation.navigate(routeName, params);
};

export const toggleDrawer = (navigation) => {
    navigation.toggleDrawer();
};

export const openDrawer = (navigation) => {
    navigation.openDrawer();
};

export const closeDrawer = (navigation) => {
    navigation.closeDrawer();
};