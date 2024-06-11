describe('Scroll and Select Integration test', () => {
    const itemsToTestSet = [['Item 5', 'Item 6', 'Item 8'],['Item 8', 'Item 6', 'Item 5']]
    const itemLocation = [{'Item 5': 230, 'Item 6': 270, 'Item 8': 310},{'Item 5': 580, 'Item 6': 620, 'Item 8': 660}]
    const scrollCoordinatesSet = [{'x': 200, 'y1': 305, 'y2': 180}, {'x': 200, 'y1': 660, 'y2': 530}]
    const topBar = {'x': 200, 'y': 105, 'icc': 2};
    const bottomBar = {'x': 200, 'y': 710, 'icc': 4};
    scrollAndSelectTest(topBar, itemsToTestSet[0], itemLocation[0], scrollCoordinatesSet[0])
    scrollAndSelectTest(bottomBar, itemsToTestSet[1], itemLocation[1], scrollCoordinatesSet[1])
    function scrollAndSelectTest(dropDown, itemsToTest, itemCoordinates, scrollCoordinates){
        context('single select', () => {
            beforeEach(async() => {
                await driver.pause(2000);
                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 200, x: dropDown['x'], y: dropDown['y']})
                .down({button: 0})
                .up({button: 0})
                .perform();
                await driver.pause(2000);
            })

            it(`it should show ${itemsToTest[0]} selected after scroll and selecting`, async() => {
                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
                .down({button: 0})
                .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration: 100, x: 200, y: itemCoordinates[itemsToTest[0]]})
                .down({button : 0})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                const dropDown = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "${itemsToTest[0]} ᨆ"\`][2]`);
                await dropDown.waitForExist(500)
                expect (dropDown).toExist();

            })
            it(`it should show ${itemsToTest[1]} selected after scroll and selecting`, async() => {
                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
                .down({button: 0})
                .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration: 100, x: 200, y: itemCoordinates[itemsToTest[1]]})
                .down({button : 0})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                const dropDown = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "${itemsToTest[1]} ᨆ"\`][2]`);
                await dropDown.waitForExist(500)
                expect (dropDown).toExist();
            })
            it(`it should show ${itemsToTest[2]} selected after scroll and selecting`, async() => {
                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
                .down({button: 0})
                .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration: 100, x: 200, y: itemCoordinates[itemsToTest[2]]})
                .down({button : 0})
                .up({button: 0})
                .perform();
                await driver.pause(500);

                const dropDown = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "${itemsToTest[2]} ᨆ"\`][2]`);
                await dropDown.waitForExist(500)
                expect (dropDown).toExist();
            })
        })
    }
})