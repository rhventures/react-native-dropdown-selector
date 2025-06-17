describe('Styled Selection Functionality Tests', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('Should Test Styled Single Selection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await scrollView.scroll(1500, 'down');
        await expect(element(by.id('StyledSingleSelect'))).toBeVisible();
        await element(by.id('StyledSingleSelect')).tap();
        await element(by.label('Item 4')).swipe('up', 'fast');
        await expect(element(by.label('Item 8'))).toBeVisible();
        await element(by.label('Item 8')).tap();
        await device.tap({x: 10, y: 10});
        await element(by.id('StyledSingleSelect')).tap();
        await element(by.label('Item 2')).tap();
    });

    it('Should Test Styled Multi Deselection', async () => {
        const scrollView = element(by.type('android.widget.ScrollView'));
        await device.reloadReactNative();
        await scrollView.scroll(1500, 'down');
        await expect(element(by.id('StyledMultiSelect'))).toBeVisible();
        await element(by.id('StyledMultiSelect')).tap();
        await element(by.label('Item 3')).tap();
        await element(by.label('Item 5')).tap();
        await element(by.label('Item 4')).tap();
        await element(by.label('Item 1')).tap();
    });
   
    it('Should Test Styled Multi Selection', async () => {
        await element(by.label('Item 3')).tap();
        await element(by.label('Item 5')).tap();
        await element(by.label('Item 4')).tap();
        await element(by.label('Item 1')).tap();
    });

    it('Should Test Styled Clear Button', async () => { 
        await expect(element(by.label('ClearButton'))).toBeVisible;
        await element(by.label('ClearButton')).tap(); 
        await expect(element(by.text('I am very stylish'))).toBeVisible;
    });
});