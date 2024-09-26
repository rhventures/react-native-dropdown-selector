describe("Click Me Multi Select Demo", () => {
    context("multi-select demo with arrow button", () => {
        beforeEach(async () => {
            await driver.pause(2000);
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200 , y: 755})
            .down({button: 0})
            .up({button: 0})
            .perform();
            await driver.pause(3000);
        })
        
        it('should have item 3 and 4 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 550})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 710})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 400})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 3, Item 4 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have item 3, item 4, item 7 selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 590})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 400})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);
            
            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 3, Item 4, Item 7 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })
        
        it('should have all items selected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 630})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 670})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 400})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);
            
            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Item 3, Item 4, Item 7, Item 1, Item 2 ᨆ"`][2]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })

        it('should have all items deselected', async() => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 550})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 590})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 630})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 670})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 710})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);

            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: 200, y: 400})
            .down({button: 0})
            .up({button : 0})
            .perform();
            await driver.pause(1000);
            
            const dropDown = await driver.$('-ios class chain:**/XCUIElementTypeOther[`name == "Click me ᨆ"`][4]');
            await dropDown.waitForExist(500)
            expect (dropDown).toExist();
        })


    })




   
})