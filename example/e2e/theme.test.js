describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Should Scroll to Theme Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(1000, 'down');
        await expect(element(by.text('Select a theme'))).toBeVisible();
    });

    it('Should Change Theme to "dark"', async () => {
        await element(by.text('Select a theme')).tap();
        await element(by.text('dark')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "dark"'))).toBeVisible();
    });

    it('Should Change Theme to "light"', async () => { 
        await element(by.text('dark')).tap();
        await element(by.text('light')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "light"'))).toBeVisible();
    });

    it('Should Change Theme to "system"', async () => {
        await element(by.text('light')).tap();
        await element(by.text('system')).tap();
        await expect(element(by.text('Select a theme to see all the dropdowns change! Current theme is "system"'))).toBeVisible();
    });
});