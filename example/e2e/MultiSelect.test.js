describe('Multi Selection Functionality Tests', () => {
    beforeAll(async() => {
        await device.launchApp();
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
});