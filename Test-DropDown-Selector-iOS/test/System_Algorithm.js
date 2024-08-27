describe('Multi Select Testing Including Scrolling Capability', () => {
    
    context('Using dynamics and algorithms', () => {
    
        const topItemCoordinates = {'Item 3' : {'x': 200 , 'y': 550}, 'Item 7': {'x': 200, 'y': 590}, 
        'Item 1': {'x': 200, 'y': 630}, 'Item 2': {'x': 200, 'y': 670}, 
        'Item 4': {'x': 200, 'y': 710}}
        const bottomItemCoordinates = {'Item 2' : {'x': 200 , 'y': 550}, 'Item 4': {'x': 200, 'y': 590}, 
        'Item 5': {'x': 200, 'y': 630}, 'Item 6': {'x': 200, 'y': 670}, 
        'Item 8': {'x': 200, 'y': 710}};
        const topItems = ['Item 3', 'Item 7', 'Item 1', 'Item 2', 'Item 4'];
        const bottomItems = ['Item 2', 'Item 4', 'Item 5', 'Item 6', 'Item 8'];
        const itemsToTest = [['Item 3', 'Item 4', 'Item 8', 'Item 7'],
        ['Item 1', 'Item 6', 'Item 2', 'Item 5']]
        const pattern = [['Item 1', 'Item 4', 'Item 2', 'Item 3', 'Item 2', 'Item 7', 'Item 1', 'Item 8'],
        ['Item 6', 'Item 4', 'Item 3', 'Item 5', 'Item 2', 'Item 1', 'Item 3' ,'Item 4']]
        function upScroll(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 560})
            .down({button: 0})
            .move({duration : 500, x: 200 , y: 720})
            .up({button: 0});
        }
        
        function downScroll(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 720})
            .down({button: 0})
            .move({duration : 500, x: 200 , y: 560})
            .up({button: 0});
        }

        function clickItem(itemCoordinates){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: itemCoordinates['x'] , y: itemCoordinates['y']})
            .down({button: 0})
            .up({button: 0});
        }

        function clickSelector(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 750})
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

        // do one at a time, because if the test cases go to long, it might timeout.
        selectWithAlgorithmTest(itemsToTest[0], pattern[0]);
        //selectWithAlgorithmTest(itemsToTest[1], pattern[1]);

        function selectWithAlgorithmTest(items , algorithm){
            it(`should have ${items.join(', ')} selected`, async () => {                
                var top = true;
                var displayedItems= topItems
                var selectedItems = [];
                for(let i = 0; i < algorithm.length; i++){
                    if(displayedItems.indexOf(algorithm[i]) == -1 && top){
                        await downScroll().perform();
                        await driver.pause(1000);
                        await clickItem(bottomItemCoordinates[algorithm[i]]).perform();
                        displayedItems = bottomItems;
                        top = false;
                    }
                    else if(displayedItems.indexOf(algorithm[i]) == -1 && !top){
                        await upScroll().perform();
                        await driver.pause(1000);
                        await clickItem(topItemCoordinates[algorithm[i]]).perform();
                        displayedItems = topItems;
                        top = true;
                    }
                    else{
                        if(top){
                            await clickItem(topItemCoordinates[algorithm[i]]).perform();
                        }
                        else{
                            await clickItem(bottomItemCoordinates[algorithm[i]]).perform();
                        }
                    }
                    await driver.pause(1000);
                    let index = selectedItems.indexOf(algorithm[i]);
                    if(index == -1){
                        selectedItems.push(algorithm[i]);
                    }
                    else{
                        selectedItems.splice(index, 1);
                    }
                    console.log(selectedItems);
                    await driver.pause(500);
                }
                await clickScreen().perform();
                await driver.pause(500);

                const selector = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "${selectedItems.join(' ')} ᨆ"\`][2]`);
                await driver.pause(500);
                //The order does not matter here.
                for(let i = 0; i < items.length; i++){
                    await expect(selector).toHaveAttribute('name', expect.stringContaining(items[i]));
                    await driver.pause(500);
                }
                //reset
                await clickSelector().perform();
                await driver.pause(1000);
                var top = true;
                var displayedItems= topItems
                for(let i = 0; i < items.length; i++){
                    if(displayedItems.indexOf(items[i]) == -1 && top){
                        await downScroll().perform();
                        await driver.pause(1000);
                        await clickItem(bottomItemCoordinates[items[i]]).perform();
                        displayedItems = bottomItems;
                        top = false;
                    }
                    else if(displayedItems.indexOf(items[i]) == -1 && !top){
                        await upScroll().perform();
                        await driver.pause(1000);
                        await clickItem(topItemCoordinates[items[i]]).perform();
                        displayedItems = topItems;
                        top = true;
                    }
                    else{
                        if(top){
                            await clickItem(topItemCoordinates[items[i]]).perform();
                        }
                        else{
                            await clickItem(bottomItemCoordinates[items[i]]).perform();
                        }
                    }
                    await driver.pause(500);
                }
                await clickScreen().perform();
                await driver.pause(500);

                const final = await driver.$(`-ios class chain:**/XCUIElementTypeOther[\`name == "Click me ᨆ"\`][4]`);
                expect(final).toExist();
                await driver.pause(500);
            })
        }
    })
})