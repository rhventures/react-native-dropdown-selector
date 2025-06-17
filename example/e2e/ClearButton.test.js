describe('Clear Button Functionality Tests', () => {
    beforeAll(async() => {
        await device.launchApp();
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
});