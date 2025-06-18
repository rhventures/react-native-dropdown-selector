describe('Settings Functionality Tests', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(1200, 'down');
    });

    it('Should Test Disable Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        
        await expect(element(by.id('SelectorSettings'))).toBeVisible();
        await element(by.id('SelectorSettings')).tap();
        await expect(element(by.label('Disabled'))).toBeVisible();
        await element(by.label('Disabled')).tap();
        await device.tap({x: 10, y: 10});
        await expect(element(by.id('ThemeSelect'))).toBeVisible();
        await element(by.id('ThemeSelect')).tap();
        await scrollView.scroll(1200, 'up');
        await expect(element(by.id('SimpleDataSelect'))).toBeVisible();
        await element(by.id('SimpleDataSelect')).tap();
    });

    it('Should Test Searchable Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));    

        await expect(element(by.id('SelectorSettings'))).toBeVisible();
        await element(by.id('SelectorSettings')).tap();
        await expect(element(by.label('Searchable'))).toBeVisible();
        await element(by.label('Searchable')).tap();
        await device.tap({x: 10, y: 10});
        await expect(element(by.id('ThemeSelect'))).toBeVisible();
        await element(by.id('ThemeSelect')).tap();
        await expect(element(by.id('searchInput'))).toBeVisible();
        await element(by.id('searchInput')).typeText('da');
        await expect(element(by.label('dark'))).toBeVisible();
        await element(by.label('dark')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "dark"'))).toBeVisible();
        await scrollView.scroll(1000, 'up');
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
});