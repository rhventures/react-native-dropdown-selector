describe('selecting one element', () => {
    context('using mouse controls', () => {
        beforeEach(async() => {
            await driver.pause(2000);
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 369 , y: 105})
            .down({button: 0})
            .up({button: 0})
            .perform();
            await driver.pause(3000);
        })
        it('should have item 3 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 164, y: 148})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 3 ᨆ"`][2]');
            expect (dropDown).toExist();
        })
    })
})