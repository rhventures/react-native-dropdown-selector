/* 
This file has all the same tests as other test files, 
but it will only launch the app once and reload react-native only when needed,
it should run faster and more smoothly than the separate test files. 

To run this file, please use command below:
`detox test /e2e/testAll.test.js --configuration android.emu.debug`
*/

describe('All Tests for Example APP', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    /* -------------Single Selection Functionality Tests------------- */

    it('------------Single Selection Tests------------', async () => {
        await device.reloadReactNative();
    });

    it('Should Test Deadly Simple Single Selection', async () => {
        await expect(element(by.id('SimpleDataSelect'))).toBeVisible();
        await element(by.id('SimpleDataSelect')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 3')).tap();
        await expect(element(by.text('Selected: Item 3 (scroll down)'))).toBeVisible();
    });

    it('Should Test Scroll Down Selection List', async () => {
        await element(by.id('SimpleDataSelect')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 4')).swipe('up', 'slow');
        await expect(element(by.label('Item 8'))).toBeVisible();
    });

    it('Should Test Change Selection Value to Item 8', async () => {
        await expect(element(by.label('Item 8'))).toBeVisible();
        await element(by.label('Item 8')).tap();
        await expect(element(by.text('Selected: Item 8 (scroll down)'))).toBeVisible();
    });

    it('Should Test Change Multiple Single Selection to Different Items', async () => {
        await device.reloadReactNative();

        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(800, 'down');

        await expect(element(by.id('DataSelect(1)'))).toBeVisible();
        await expect(element(by.id('DataSelect(2)'))).toBeVisible();
        await expect(element(by.id('DataSelect(3)'))).toBeVisible();

        await element(by.id('DataSelect(1)')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 7')).tap();

        await element(by.id('DataSelect(2)')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 4')).tap();

        await element(by.id('DataSelect(3)')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 4')).swipe('up', 'slow');
        await expect(element(by.label('Item 8'))).toBeVisible();
        await element(by.label('Item 8')).tap();
        await element(by.label('Item 8')).toBeVisible;
    });

    /* -----------Single Selection Functionality Tests End----------- */

    /* ------------Multiple Selection Functionality Tests------------ */

    it('-----------Multiple Selection Tests-----------', async () => {
        await device.reloadReactNative();
    });

    it('Should Test Deadly Simple Multi Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(500, 'down');
        await expect(element(by.id('SimpleMultiDataSelect'))).toBeVisible();
        await element(by.id('SimpleMultiDataSelect')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 3')).tap();
        await element(by.label('Item 2')).tap();
        await element(by.label('Item 4')).swipe('up', 'fast');
        await element(by.label('Item 6')).tap();
        await element(by.label('Item 8')).tap();
        await device.tap({x: 10, y: 10});
    });

    it('Should Test Deselect Items in Multi Selection', async () => {
        await element(by.id('SimpleMultiDataSelect')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 3')).tap();
        await element(by.label('Item 4')).swipe('up', 'fast');
        await element(by.label('Item 8')).tap();
        await device.tap({x: 10, y: 10});
    });

    /* ----------Multiple Selection Functionality Tests End---------- */

    /* ---------------Clear Button Functionality Tests--------------- */

    it('--------------Clear Button Tests--------------', async () => {
        await device.reloadReactNative();
    });

    it('Should Test Clear Button Function', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(500, 'down');
        await expect(element(by.id('SimpleMultiDataSelect'))).toBeVisible();
        await element(by.id('SimpleMultiDataSelect')).tap();
        await expect(element(by.label('Item 3'))).toBeVisible();
        await element(by.label('Item 3')).tap();
        await element(by.label('Item 2')).tap();
        await element(by.label('Item 4')).swipe('up', 'fast');
        await element(by.label('Item 6')).tap();
        await element(by.label('Item 8')).tap();
        await expect(element(by.label('ClearButton'))).toBeVisible();
        await element(by.label('ClearButton')).tap();
        await device.tap({x: 10, y: 10});
        await expect(element(by.label('Item 3'))).not.toBeVisible();
        await expect(element(by.label('Item 2'))).not.toBeVisible();
        await expect(element(by.label('Item 6'))).not.toBeVisible();
        await expect(element(by.label('Item 8'))).not.toBeVisible();
    });

    /* -------------Clear Button Functionality Tests End------------- */

    /* ---------------Theme Change Functionality Tests--------------- */

    it('--------------Theme Change Tests--------------', async () => {
        await device.reloadReactNative();
    });
    
    it('Should Scroll to Theme Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(1000, 'down');
        await expect(element(by.text('Select a theme'))).toBeVisible();
    });

    it('Should Change Theme to "dark"', async () => {
        await element(by.id('ThemeSelect')).tap();
        await element(by.label('dark')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "dark"'))).toBeVisible();
    });

    it('Should Change Theme to "light"', async () => { 
        await element(by.id('ThemeSelect')).tap();
        await element(by.label('light')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "light"'))).toBeVisible();
    });

    it('Should Change Theme to "system"', async () => {
        await element(by.id('ThemeSelect')).tap();
        await element(by.label('system')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "system"'))).toBeVisible();
    });

    /* -------------Theme Change Functionality Tests End------------- */

    /* -----------------Settings Functionality Tests----------------- */

    it('----------------Settings Tests----------------', async () => {
        await device.reloadReactNative();
    });

    it('Should Test Disable Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        
        await scrollView.scroll(800, 'down');
        await expect(element(by.id('SelectorSettings'))).toBeVisible();
        await element(by.id('SelectorSettings')).tap();
        await expect(element(by.label('Disabled'))).toBeVisible();
        await element(by.label('Disabled')).tap();
        await device.tap({x: 10, y: 10});
        await expect(element(by.id('ThemeSelect'))).toBeVisible();
        await element(by.id('ThemeSelect')).tap();
        await scrollView.scroll(800, 'up');
        await expect(element(by.id('SimpleDataSelect'))).toBeVisible();
        await element(by.id('SimpleDataSelect')).tap();
    });

    it('Should Test Searchable Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView')); 

        await device.reloadReactNative();
        await scrollView.scroll(800, 'down');
        await expect(element(by.id('SelectorSettings'))).toBeVisible();
        await element(by.id('SelectorSettings')).tap();
        await expect(element(by.label('Searchable'))).toBeVisible();
        await element(by.label('Searchable')).tap();
        await device.tap({x: 10, y: 10});
        await expect(element(by.id('ThemeSelect'))).toBeVisible();
        await element(by.id('ThemeSelect')).tap();
        await expect(element(by.id('searchInput'))).toBeVisible();
        await scrollView.scroll(100, 'down');
        await element(by.id('searchInput')).typeText('da');
        await expect(element(by.label('dark'))).toBeVisible();
        await element(by.label('dark')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "dark"'))).toBeVisible();
        await scrollView.scroll(600, 'up');
        await expect(element(by.id('SimpleMultiDataSelect'))).toBeVisible();
        await element(by.id('SimpleMultiDataSelect')).tap();
        await expect(element(by.id('searchInput'))).toBeVisible();
        await element(by.id('searchInput')).typeText('8');
        await expect(element(by.label('Item 8'))).toBeVisible();
        await element(by.label('Item 8')).tap();
        await element(by.id('searchInput')).clearText();
        await element(by.id('searchInput')).replaceText('6');
        await expect(element(by.label('Item 6'))).toBeVisible();
        await element(by.label('Item 6')).tap();
    });     

    /* ---------------Settings Functionality Tests End--------------- */
});