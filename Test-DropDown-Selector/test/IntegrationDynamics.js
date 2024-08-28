describe("Integration test for the multi selector", () => {

    const itemCombo = [['Item 3', 'Item 1', 'Item 6', 'Item 7']]
    const multiSelectArrow = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)';
    const scrollCoordinatesSet = [{'x' :645, 'y1': 2320, 'y2': 1715},{'x' :625, 'y1': 1810, 'y2': 2445}];
    multipleItemSelectTest(itemCombo, multiSelectArrow, scrollCoordinatesSet);

    function multipleItemSelectTest(itemCombo, dropDownArrow, scrollCoordinates){
        context("When choosing multiple items that needs scrolling", () => {
            
            beforeEach(async () => {
                await driver.pause(2000);
                const multiSelector = await driver.$(dropDownArrow);
                multiSelector.click();
                await driver.pause(3000);
            })

            function downScroll(){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 200, x: scrollCoordinates[0]['x'] , y: scrollCoordinates[0]['y1']})
                .down({button: 0})
                .move({duration : 600, x: scrollCoordinates[0]['x'] , y: scrollCoordinates[0]['y2']})
                .up({button: 0});
            }

            function upScroll(){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 200, x: scrollCoordinates[1]['x'] , y: scrollCoordinates[1]['y1']})
                .down({button: 0})
                .move({duration : 600, x: scrollCoordinates[1]['x'] , y: scrollCoordinates[1]['y2']})
                .up({button: 0});
            }

            function getBackScreen() {
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)';
            }
            function getSelector(){
                return '-android uiautomator:new UiSelector().description("Click me, ᨆ").instance(1)';
            }
            function getItemGroup(){
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(5)';
            }
            function getDropDownArrow(){
                return dropDownArrow;
            }

            multipleItemTest(itemCombo[0]);
        
            function multipleItemTest(items){
                it(`should have ${items.join(', ')} selected`, async () => {
                    var top = true;
                    var group = await driver.$(getItemGroup());
                    var displayedContent = await group.$$('.android.view.ViewGroup');
                    var displayedItemList = [];
                    for(let i = 1; i< displayedContent.length; i+=2){
                        displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                    }

                    for(let i = 0; i < items.length; i ++){
                        if(displayedItemList.indexOf(items[i]) == -1 && top){
                            await downScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            top = false;
                            await driver.pause(1000);
                        }
                        else if(displayedItemList.indexOf(items[i]) == -1 && !top){
                            await upScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            top = true;
                            await driver.pause(1000);
                        }
                        
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(1000);
                    }

                    const backScreen = await driver.$(getBackScreen());
                    backScreen.click();
                    await driver.pause(1000);

                    const selector = await driver.$(`accessibility id:${items.join(', ')}, ᨆ`);
                    const selectorDisplay = await selector.$$('.android.widget.TextView');

                    for(let i = 0; i < items.length; i++){
                        await expect(selectorDisplay[i]).toHaveText(items[i]);
                    }

                    await driver.pause(500);
                    const multiSelector = await driver.$(getDropDownArrow());
                    multiSelector.click();
                    await driver.pause(1000);

                    top = true;
                    group = await driver.$(getItemGroup());
                    displayedContent = await group.$$('.android.view.ViewGroup');
                    displayedItemList = [];
                    for(let i = 1; i< displayedContent.length; i+=2){
                        displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                    }

                    for(let i = 0; i < items.length; i ++){
                        if(displayedItemList.indexOf(items[i]) == -1 && top){
                            await downScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            top = false;
                            await driver.pause(1000);
                        }
                        else if(displayedItemList.indexOf(items[i]) == -1 && !top){
                            await upScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            top = true;
                            await driver.pause(1000);
                        }
                        
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(500);
                    }
 
                    const Screen = await driver.$(getBackScreen());
                    Screen.click();
                    await driver.pause(500);

                    const originalSelector = await driver.$(getSelector());
                    const originalSelectorDisplay = await originalSelector.$$('.android.widget.TextView')[0];
                    await originalSelectorDisplay.waitForExist(1000);
                    await expect(originalSelectorDisplay).toHaveText('Click me');
                })
            }
        })
    }
})