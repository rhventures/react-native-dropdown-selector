describe('Integrations testing on the multi select bar', () => {
    context('Using scrolling and selecting combined', () => {
        const items = [['Item 2', 'Item 5'], ['Item 4', 'Item 6'], ['Item 5', 'Item 6', 'Item 8'], ['Item 2', 'Item 8']];
        const itemCoordinates = {'Item 2' : {'x': 200 , 'y': 550}, 'Item 4': {'x': 200, 'y': 590}, 
        'Item 5': {'x': 200, 'y': 630}, 'Item 6': {'x': 200, 'y': 670}, 
        'Item 8': {'x': 200, 'y': 710}};

        function scroll(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 720})
            .down({button: 0})
            .move({duration : 500, x: 200 , y: 560})
            .up({button: 0});
        }

        function clickSelector(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 750})
            .down({button: 0})
            .up({button: 0});
        }

        function clickItem(itemCoordinates){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: itemCoordinates['x'] , y: itemCoordinates['y']})
            .down({button: 0})
            .up({button: 0});
        }

        function clickScreen(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 400})
            .down({button: 0})
            .up({button: 0});
        }

       
        beforeEach(async () => {
            await driver.pause(1500);
            await clickSelector().perform();
            await driver.pause(2000);
        })
        selectAndScrollTest(items[0], itemCoordinates);
        selectAndScrollTest(items[1], itemCoordinates);
        selectAndScrollTest(items[3], itemCoordinates); 
        selectAndScrollTest(items[2], itemCoordinates); 
        // cant trap these in a loop, because it would throw off the order
        
        function selectAndScrollTest(items, itemCoordinates){
            it(`should have ${items.join(', ')} selected`, async() => {
                await scroll().perform();
                await driver.pause(1000);
                for(let i = 0; i < items.length; i++){
                    await clickItem(itemCoordinates[items[i]]).perform();
                    await driver.pause(500);
                }
                await clickScreen().perform();
                await driver.pause(500);

                const selector = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "${items.join(', ')} ᨆ"\`][2]`)
                await selector.waitForExist(500);
                await expect(selector).toExist();

                await driver.pause(1000);
                await clickSelector().perform();
                await driver.pause(1000);

                await scroll().perform();
                await driver.pause(1000);

                for(let i = 0; i < items.length; i++){
                    await clickItem(itemCoordinates[items[i]]).perform();
                    await driver.pause(500);
                }
                await clickScreen().perform()
                await driver.pause(500);

            })
        }    
    })
})