describe('selecting one element in the smaller list', () => {
    context('using mouse controls', () => {
        beforeEach(async() => {
            await driver.pause(2000);
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 705})
            .down({button: 0})
            .up({button: 0})
            .perform();
            await driver.pause(3000);
        })
        it('should have item 3 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 500})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 3 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have item 7 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 540})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 7 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have item 1 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 580})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 1 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have item 2 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 620})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 2 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have item 4 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 660})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 4 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })
    })
    
})